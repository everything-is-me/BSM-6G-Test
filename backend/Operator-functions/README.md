# Useful Information

In this folder you can find the following functions

## HTTPS Endpoints

- EA-get_band.txt: function to get band

- EA-list-purchase: function to list or purchase a band


## How Jobs work step-by step:

1. decode_log: This step decodes an Ethereum event log generated when a specific event occurs in the Ethereum smart contract. 

2. decode_cbor: This step parses the data extracted in the previous step

3. fetch: This step sends a request to an external bridge 

4. parse: This step parses the JSON response received from the external bridge in the previous step. 

5. encode_large: This step encodes data into the Ethereum ABI format. 

6. encode_tx: This step further encodes data into the Ethereum ABI format

7. submit_tx:  This step submits a transaction to the Ethereum network. 


## Useful links about Chainlink Nodes 

You can find more information about Running a Chainlink Node:

- https://docs.chain.link/chainlink-nodes/v1/running-a-chainlink-node

You can find more information about Fullfiling Requests:

- https://docs.chain.link/chainlink-nodes/v1/fulfilling-requests#requirements
