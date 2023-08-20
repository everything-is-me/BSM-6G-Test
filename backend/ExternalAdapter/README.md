# Note: Readme edited by @davidcuellard

The README has been revised to suit project requirements. The Chainlink NodeJS External Adapter Template is accessible at the following GitHub repository: https://github.com/thodges-gh/CL-EA-NodeJS-Template.git.

## Enter into the ExternalAdapter directory

```bash
cd ExternalAdapter
```


## Add enviornment variables
```bash
touch .env
```

Open the .env file and add the API_KEY
```
API_KEY = "API_KEY"
```

## Install Locally

Install dependencies:

```bash
yarn
```

Natively run the application (defaults to port 8080):

### Run

```bash
yarn start
```

###

## Call the external adapter/API server

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 1, "data": { "id": "1", "endQuery": "spectrum_availability", "state": "null", "address": "null" } }'
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

Run in: http://localhost:6688/ 

```bash
cd ~/chainlink-sepolia && docker run --platform linux/x86_64/v8 --name chainlink-4 -v ~/chainlink-sepolia:/chainlink -it -p 6688:6688 --add-host=host.docker.internal:host-gateway smartcontract/chainlink:2.0.0 node -config /chainlink/config.toml -secrets /chainlink/secrets.toml start -a /chainlink/.api
```

Run in: http://host.docker.internal:8080/ 

```bash
cd ~/chainlink-sepolia && docker run --platform linux/x86_64/v8 --name chainlink-5 -v ~/chainlink-sepolia:/chainlink -it --net=host --add-host=host.docker.internal:host-gateway smartcontract/chainlink:2.0.0 node -config /chainlink/config.toml -secrets /chainlink/secrets.toml start -a /chainlink/.api
```

## More information

You can find more information about Building and Using External Adapters in: 

- https://docs.chain.link/chainlink-nodes/external-adapters/external-adapters

- https://blog.chain.link/build-and-use-external-adapters/
