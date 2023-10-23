import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import contractAbi from "../config/contractABI.json"; // Replace with your contract's ABI

const ethers = require("ethers");

function SmartContract() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [msgCat, setMsgCat] = useState("");
  const [connected, setConnected] = useState(false);
  const [bandId, setBandId] = useState("");
  const [bandIdListing, setBandIdListing] = useState("");
  const [stateListing, setStateListing] = useState("");
  const [bandIdPurchasing, setBandIdPurchasing] = useState("");
  const [statePurchasing, setStatePurchasing] = useState("");
  const [metaAnswer, setMetaAnswer] = useState(null);
  const [isAuthorizedListerAns, setIsAuthorizedListerAns] = useState(false);
  const [isAuthorizedPurchaserAns, setIsAuthorizedPurchaserAns] =
    useState(false);

  async function initializeWeb3() {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setConnected(true);
        const provider = new ethers.providers.Web3Provider(
          window.ethereum || window.web3.currentProvider
        );

        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          "0x902261248155B62a06395479ecB0807768e458db",
          contractAbi,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected.");
    }
  }

  async function connectWallet() {
    await initializeWeb3();
  }

  function disconnectWallet() {
    setAccount(null);
    setContract(null);
    setConnected(false);
  }

  async function getMessages() {
    if (contract) {
      try {
        //const messageCat = await contract.message();
        setMsgCat("Error: Operator not connected");
      } catch (error) {
        console.error("Error getting messages:", error);
        setMsgCat("Error getting messages:", error);
      }
    }
  }

  async function requestCat() {
    if (contract && bandId !== "") {
      try {
        const tx = await contract.requestCat(Number(bandId));
        await tx.wait();
        console.log("Cat request successful!");
        setMetaAnswer("Cat request successful!");
      } catch (error) {
        console.error("Error sending cat request:", error);
        setMetaAnswer("Error sending cat request: " + error);
      }
    }
  }

  const isAuthorizedUser = useCallback(async () => {
    if (contract) {
      try {
        const lister = await contract.isAuthorizedLister(account);
        const purchaser = await contract.isAuthorizedPurchaser(account);
        setIsAuthorizedListerAns(lister);
        setIsAuthorizedPurchaserAns(purchaser);
      } catch (error) {
        console.error("Error getting messages:", error);
        setIsAuthorizedListerAns(false);
        setIsAuthorizedPurchaserAns(false);
      }
    }
  }, [contract, account]);

  useEffect(() => {
    isAuthorizedUser();
  }, [connected, isAuthorizedUser]);

  return (
    <div className="container">
      <h1>Wallet Interaction</h1>
      {connected && account != null ? (
        <div>
          <div>User Account: {account}</div>
          <div>Is Authorized Lister: {String(isAuthorizedListerAns)}</div>
          <div>Is Authorized Purchaser: {String(isAuthorizedPurchaserAns)}</div>
          <button className="disconnect-btn" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
          <div className="button-group">
            <input
              type="text"
              placeholder="Band ID"
              value={bandId}
              onChange={(e) => setBandId(e.target.value)}
            />
            <button className="action-btn" onClick={requestCat}>
              Request Cat
            </button>
          </div>

          <div className="button-group">
            <input
              type="text"
              placeholder="Band ID"
              value={bandIdListing}
              onChange={(e) => setBandIdListing(e.target.value)}
              disabled={!isAuthorizedListerAns}
            />
            <input
              type="text"
              placeholder="State"
              value={stateListing}
              onChange={(e) => setStateListing(e.target.value)}
              disabled={!isAuthorizedListerAns}
            />
            <button className="action-btn" disabled={!isAuthorizedListerAns}>
              Request Listing
            </button>
          </div>

          <div className="button-group">
            <input
              type="text"
              placeholder="Band ID"
              value={bandIdPurchasing}
              onChange={(e) => setBandIdPurchasing(e.target.value)}
              disabled={!isAuthorizedPurchaserAns}
            />
            <input
              type="text"
              placeholder="State"
              value={statePurchasing}
              onChange={(e) => setStatePurchasing(e.target.value)}
              disabled={!isAuthorizedPurchaserAns}
            />
            <button className="action-btn" disabled={!isAuthorizedPurchaserAns}>
              Request Purchasing
            </button>
          </div>
          {metaAnswer != null ? <div>Metamask answer: {metaAnswer}</div> : null}
          <div className="message-cat">
            <button className="action-btn" onClick={getMessages}>
              Get Messages
            </button>
            <div>Message: {msgCat} </div>
          </div>
        </div>
      ) : (
        <button className="connect-wallet-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default SmartContract;
