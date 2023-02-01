const web3 = require('./provider');
const Tx = require("ethereumjs-tx").Transaction;

const { getGas, gasLimit } = require('./getGas');
require('dotenv').config();

// Retrieve the signer private key
const SIGNER_KEY = process.env.PRIVATE_KEY;
const SENDER = process.env.SENDER_ADDRESS;
const PRIVATE_KEY = Buffer.from(SIGNER_KEY, "hex");

// Send transfer
async function sendEth(to, amount) {

    const gasPriceWei = await getGas()
    const gasLimitUnits = await gasLimit(SENDER, to)
    const nonce = await web3.eth.getTransactionCount(SENDER)

    // Build the transaction
    const transactionObject = {
        to,
        gasPrice: web3.utils.toHex(gasPriceWei),
        gasLimit: web3.utils.toHex(gasLimitUnits),
        nonce: web3.utils.toHex(nonce),
        value: web3.utils.toHex(amount),
    };

    // create a new transaction object to sign
    const tx = new Tx(transactionObject, {
        chain: "goerli"
    });

    // sign the transaction using the private key  
    tx.sign(PRIVATE_KEY);

    // Send signed transaction to the blockchain
    const serializedTx = tx.serialize();
    const rawTransaction = `0x${serializedTx.toString("hex")}`;

    const receipt = await web3.eth.sendSignedTransaction(rawTransaction);
    const txHash = receipt.transactionHash;
    const etherscanUrl = `https://goerli.etherscan.io/tx/${txHash}`;

    console.log(`Transaction hash: ${txHash}`);
    console.log(`See transaction: ${etherscanUrl}`);

    return etherscanUrl;
}

module.exports = {
    sendEth
}