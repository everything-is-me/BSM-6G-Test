# BSM-6G: Blockchain-based Dynamic Spectrum Management for 6G Networks: Addressing Interoperability and Scalability

### Bournemouth University

- Department of Computing and Informatics
- Faculty of science & technology
- Authors: DAVID CUELLAR & MUNTADHER SALLAL
- DOI: 10.1109/ACCESS.2024.3393288
- link: https://ieeexplore.ieee.org/document/10507790

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
    │   │   │   ├── files
    │   │   │   │   └── ...
    │   │   │   └── get_data.py
    │   │   ├── README.md
    │   │   └── Scalability
    │   │       ├── data_analysis.ipynb
    │   │       ├── files
    │   │       │   └── ...
    │   │       └── get_data.ipynb
    │   ├── ExternalAdapter
    │   │   ├── README.md
    │   │   ├── index.js
    │   │   └── ...
    │   ├── MongoDB-functions
    │   │   ├── README.md
    │   │   ├── files
    │   │   │   └── fatMapping_edited.json
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
        └── ...
      

Each folder has its own README.md

## License
[MIT](https://choosealicense.com/licenses/mit/)
