// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//Contract with link 0xcd8C1Fd71a718c7E4F2c1Cb42C4Dab641B98A56A

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract CLAPIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request; 

    bytes private data;
    string public message;
    
    string public msgCat;

    string public msgRequestListing;
    string public msgRequestPurchase; 
    
    string private requestToEndQuery;

    bytes32 private jobId;
    uint256 private fee;

    address[] public authorizedListers;
    address[] public authorizedPurchasers;

    event RequestQuery(bytes32 indexed requestId, bytes indexed data);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0xAeb953c9633ddA6Fa343a83D37155976573d8D9C);
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (Varies by network and job)

        authorizedListers.push(owner());
        authorizedPurchasers.push(owner());
    }

    modifier onlyAuthorizedLister() {
        require(isAuthorizedLister(msg.sender), "Not authorized Lister");
        _;
    }

    modifier onlyAuthorizedPurchaser() {
        require(isAuthorizedPurchaser(msg.sender), "Not authorized Purchaser");
        _;
    }

    function isAuthorizedLister(address addr) public view returns (bool) {
        for (uint256 i = 0; i < authorizedListers.length; i++) {
            if (authorizedListers[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function isAuthorizedPurchaser(address addr) public view returns (bool) {
        for (uint256 i = 0; i < authorizedPurchasers.length; i++) {
            if (authorizedPurchasers[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function setAuthorizedPUs(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            authorizedListers.push(addresses[i]);
            authorizedPurchasers.push(addresses[i]);
        }   
    }

    function setAuthorizedSUs(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            authorizedPurchasers.push(addresses[i]);
        }
    }

    function removeAuthorizedPUs(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            for (uint256 j = 0; j < authorizedListers.length; j++) {
                if (authorizedListers[j] == addresses[i]) {
                    delete authorizedListers[j];
                }
            }
            for (uint256 j = 0; j < authorizedPurchasers.length; j++) {
                if (authorizedPurchasers[j] == addresses[i]) {
                    delete authorizedPurchasers[j];
                }
            }
        }
    }

    function removeAuthorizedSUs(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            for (uint256 j = 0; j < authorizedPurchasers.length; j++) {
                if (authorizedPurchasers[j] == addresses[i]) {
                    delete authorizedPurchasers[j];
                }
            }
        }
    }

    function requestCat(uint256 bandId) public returns (bytes32 requestId) {
        jobId = "71147743432e488aabb542263e0fcfee"; // 1 only cat
        return requestMessage(msg.sender, bandId, 0, "spectrum_availability");
    }

    function requestListing(uint256 bandId, uint256 state) public onlyAuthorizedLister returns (bytes32 requestId) {
        jobId = "aeb82867fce74f968700ab00379adce7"; // 2 for listing and purchase request
        return requestMessage(msg.sender, bandId, state, "listing");
    }

    function requestPurchase(uint256 bandId, uint256 state) public onlyAuthorizedPurchaser returns (bytes32 requestId) {
        jobId = "aeb82867fce74f968700ab00379adce7"; // 2 for listing and purchase request
        return requestMessage(msg.sender, bandId, state, "purchase");
    }

    function requestMessage(address requester, uint256 bandId, uint256 state, string memory endQuery) private returns (bytes32 requestId) {

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("endQuery", endQuery);
        req.add("id", uint256ToString(bandId));
        req.add("state", uint256ToString(state)); 
        req.add("address", addressToString(requester));
        
        requestToEndQuery = endQuery;
        return sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        bytes memory bytesData
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestQuery(_requestId, bytesData);
        data = bytesData;
        message = string(data);

        // Store the message in the appropriate variable based on the endQuery
        if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("spectrum_availability"))) {
            msgCat = message;
        } else if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("listing"))) {
            msgRequestListing = message;
        } else if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("purchase"))) {
            msgRequestPurchase = message;
        }

        
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    /**
     * Convert a uint256 to a string
     */
    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function addressToString(address value) internal pure returns (string memory) {
        bytes32 valueBytes = bytes32(uint256(uint160(value)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(valueBytes[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(valueBytes[i + 12] & 0x0f)];
        }
        return string(str);
    }
}
