const { Requester, Validator } = require("@chainlink/external-adapter");
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
  const validator = new Validator(callback, input, customParams);
  const jobRunID = validator.validated.id;
  const bandId = validator.validated.data.bandId;
  const state = validator.validated.data.state;
  const address = validator.validated.data.address;
  const endQuery = validator.validated.data.endQuery.toLowerCase();

  API_KEY = process.env.API_KEY;

  let url;

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

  headers = {
    apiKey: API_KEY,
  };

  const config = {
    url,
    params,
    headers,
  };

  Requester.request(config, customError)
    .then((response) => {
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

/* 
// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};
 */

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;