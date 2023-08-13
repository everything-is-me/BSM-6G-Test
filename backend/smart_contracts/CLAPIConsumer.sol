// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract CLAPIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request; 

    bytes private data;
    string public message;
    
    string public messageCat;
    string public messageListing;
    string public messagePurchase; 
    
    string private requestToEndQuery;

    bytes32 private jobId;
    uint256 private fee;

    event RequestListed(bytes32 indexed requestId, bytes indexed data);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0xAeb953c9633ddA6Fa343a83D37155976573d8D9C);
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (Varies by network and job)
    }

    function requestCat(uint256 bandId) public returns (bytes32 requestId) {
        jobId = "d58d857653844eb8b77448c495abe7da";
        return requestMessage(bandId, 0, "spectrum_availability");
    }

    function requestListing(uint256 bandId, uint256 state) public returns (bytes32 requestId) {
        jobId = "15e67661f6d4424aaa6e52e87ae15133";
        return requestMessage(bandId, state, "listing");
    }

    function requestPurchase(uint256 bandId, uint256 state) public returns (bytes32 requestId) {
        jobId = "15e67661f6d4424aaa6e52e87ae15133";
        return requestMessage(bandId, state, "purchase");
    }

    function requestMessage(uint256 bandId, uint256 state, string memory endQuery) private returns (bytes32 requestId) {

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("endQuery", endQuery);
        req.add("id", uint256ToString(bandId));
        req.add("state", uint256ToString(state)); 
        
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
        emit RequestListed(_requestId, bytesData);
        data = bytesData;
        message = string(data);

        // Store the message in the appropriate variable based on the endQuery
        if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("spectrum_availability"))) {
            messageCat = message;
        } else if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("listing"))) {
            messageListing = message;
        } else if (keccak256(abi.encodePacked(requestToEndQuery)) == keccak256(abi.encodePacked("purchase"))) {
            messagePurchase = message;
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
}
