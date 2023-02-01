const Web3 = require('web3');
require('dotenv').config();

// Create provider instance
const goerliEndpoint = process.env.GOERLI_ENDPOINT
const web3 = new Web3(goerliEndpoint)

// Export the provider instance
module.exports = web3
