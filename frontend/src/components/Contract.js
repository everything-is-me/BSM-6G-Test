// src/Contract.js
import { ethers } from "ethers";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import contractAbi from "../config/contractABI.json";

const Contract = () => {
  const [bandId, setBandId] = useState("");
  const [state, setState] = useState("");
  const [response, setResponse] = useState("");

  const contractAddress = "0x902261248155B62a06395479ecB0807768e458db"; // Replace with your contract address
  const abi = contractAbi; // Replace with your contract ABI

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/E2NL2WeO14jP-y3-CFE5lRwuHREzM_ly"
  ); // Replace with your node URL
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const handleRequest = async (endQuery, requestFunction) => {
    try {
      const requestId = await contract[requestFunction](bandId, state);
      console.log("Request sent with ID:", requestId);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleCheckCat = async () => {
    try {
      const catResponse = await contract.msgCat();
      setResponse(catResponse);
    } catch (error) {
      console.error("Error checking cat:", error);
    }
  };

  return (
    <div>
      <h1>Smart Contract Frontend</h1>
      <Form>
        <Form.Group controlId="formBandId">
          <Form.Label>Band ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Band ID"
            value={bandId}
            onChange={(e) => setBandId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => handleRequest("spectrum_availability", "requestCat")}
        >
          Request Cat
        </Button>

        <Button
          variant="success"
          onClick={() => handleRequest("listing", "requestListing")}
        >
          Request Listing
        </Button>

        <Button
          variant="info"
          onClick={() => handleRequest("purchase", "requestPurchase")}
        >
          Request Purchase
        </Button>

        <Button variant="warning" onClick={handleCheckCat}>
          Check Cat
        </Button>
      </Form>

      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default Contract;
