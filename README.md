# Blockchain-based Dynamic Spectrum Management

### Bournemouth University

Department of Computing and Informatics

Faculty of science & technology

MSc Data Science and Artificial Intelligence

Individual Masters Project

Author: David Felipe Cuellar Diaz

### Tools used (A-Z)

1. Blockchain networks

- For the Oracle implementation and testing:

  - Chainlink
  - SepoilaETH

- For the Scalability implementation and testing:

  - Solana

2. Databases

  - MongoDB: Spectrum availability and regulators databases
  - PostgreSQL: Save Chainlink node data
  - Postman: Test MongoDB databases

3. Development

  - Alchemy: External service to Run Ethereum client for the Chainlink node
  - Docker: Run Chainlink node in Docker container
  - Metamask: Run transactions and contract interactions
  - Netlify: Upload React App
  - Node.js: Compile and deploy the Chainlink external adapter
  - Python: Data analysis and visualization
  - ReactJS: Create frontend app
  - Remix: Compile and deploy smart contracts
  - Solidity: Create smart contracts

4. Hardware setup

  - MacBook Air M1 - 8 GB

### Folder structure

  .
  ├── README.md
  ├── backend
  │   ├── Data-Analysis
  │   │   ├── Interoperability
  │   │   │   ├── data_analysis.ipynb
  │   │   │   └── get_data.py
  │   │   ├── README.md
  │   │   └── Scalability
  │   │       ├── data_analysis.ipynb
  │   │       └── get_data.ipynb
  │   ├── ExternalAdapter
  │   │   ├── Dockerfile
  │   │   ├── README.md
  │   │   ├── app.js
  │   │   ├── index.js
  │   │   ├── package.json
  │   │   ├── test
  │   │   │   └── index_test.js
  │   │   └── yarn.lock
  │   ├── MongoDB-functions
  │   │   ├── README.md
  │   │   ├── h_get_band.js
  │   │   ├── h_to_list.js
  │   │   ├── h_to_purchase.js
  │   │   └── t_check_regulations.js
  │   ├── Operator-functions
  │   │   ├── EA-get_band.txt
  │   │   ├── EA-list-purchase.txt
  │   │   └── README.md
  │   └── smart_contracts
  │       ├── CLAPIConsumer.sol
  │       └── README.md
  └── frontend
      ├── README.md
      ├── package.json
      ├── public
      │   ├── _redirects
      │   ├── favicon.ico
      │   ├── index.html
      │   ├── logo192.png
      │   ├── logo512.png
      │   ├── manifest.json
      │   └── robots.txt
      └── src
          ├── App.css
          ├── App.js
          ├── App.test.js
          ├── DataDisplay.js
          ├── index.css
          ├── index.js
          ├── logo.svg
          ├── reportWebVitals.js
          └── setupTests.js

Every folder has its own README.md
