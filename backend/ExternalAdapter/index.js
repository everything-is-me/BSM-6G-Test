// External adapter template from: https://github.com/thodges-gh/CL-EA-NodeJS-Template.git

const { Requester, Validator } = require("@chainlink/external-adapter");

// Add enviornment variables
require("dotenv").config();

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  endQuery: ["query", "endQuery"],
  bandId: ["id"],
  state: ["state"],
  address: ["address", "add"],
  endpoint: false,
};

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams);
  const jobRunID = validator.validated.id;
  const bandId = validator.validated.data.bandId;
  const state = validator.validated.data.state;
  const address = validator.validated.data.address;
  const endQuery = validator.validated.data.endQuery.toLowerCase();

  API_KEY = process.env.API_KEY;
  let url;

  //Set url
  if (endQuery === "spectrum_availability") {
    url = `https://us-east-1.aws.data.mongodb-api.com/app/application-dsm-ataak/endpoint/spectrum_availability?id=${bandId}`;
  } else if (endQuery === "listing") {
    url = `https://us-east-1.aws.data.mongodb-api.com/app/application-dsm-ataak/endpoint/listing?id=${bandId}&state=${state}&address=${address}`;
  } else if (endQuery === "purchase") {
    url = `https://us-east-1.aws.data.mongodb-api.com/app/application-dsm-ataak/endpoint/purchase?id=${bandId}&state=${state}&address=${address}`;
  } else {
    return callback(500, Requester.errored(jobRunID, "Invalid endpoint"));
  }

  const params = {
    bandId,
    endQuery,
    state,
    address,
  };

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get'
  // headers = 'headers.....'
  headers = {
    apiKey: API_KEY,
  };

  const config = {
    url,
    params,
    headers,
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

module.exports.createRequest = createRequest;
