const { getBalance } = require('./src/getBalance');
const { sendEth } = require('./src/sendEth');
const web3 = require('./src/provider');
require('dotenv').config();

// Global constants 
const MAX_BALANCE_ALLOWED = "0.5"; // If the user has 0.5 ETH or more, nothing will be sent
const MAX_BALANCE_ALLOWED_WEI = web3.utils.toWei(MAX_BALANCE_ALLOWED, 'ether');

const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS;

async function main() {

    // Get the receiver balance and round it 
    const receiverBalance = await getBalance(RECEIVER_ADDRESS);
    const roundedBalance = Math.floor(receiverBalance);

    console.log(`Receiver balance: ${receiverBalance}`);
    console.log(`Rounded balance: ${roundedBalance}`);

    // If the receiver already has 0.5 ETH or more, nothing is sent, otherwise we send the difference
    if (roundedBalance >= MAX_BALANCE_ALLOWED_WEI) {
        console.log(`The user already has ${MAX_BALANCE_ALLOWED} ETH or more.`);
    } else {
        // Calculate the difference and send it
        const difference = MAX_BALANCE_ALLOWED_WEI - roundedBalance;
        const roundedDifference = Math.ceil(difference);
        const totalAfterTx = roundedBalance + roundedDifference;

        console.log(`The user will receive this amount: ${roundedDifference}`);
        console.log(`Total in wallet after transaction: ${totalAfterTx}`);

        // Send the ETH
        sendEth(RECEIVER_ADDRESS, roundedDifference);
    }
}

main();
