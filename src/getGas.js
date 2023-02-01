const web3 = require('./provider');

// The priority fee is constant at 2 Gwei
const PRIORITY_FEE = 2;

async function getGas() {

    const priorityFeeWei = web3.utils.toWei(String(PRIORITY_FEE), 'gwei');
    const baseFee = await web3.eth.getGasPrice();

    const totalFee = Number(priorityFeeWei) + Number(baseFee)
    return totalFee
}

async function gasLimit(sender, receiver) {

    // Check the addresses are valid before estimating gas
    if (!web3.utils.isAddress(sender)) {
        throw new Error(`Invalid sender address: ${sender}`);
    }

    if (!web3.utils.isAddress(receiver)) {
        throw new Error(`Invalid receiver address: ${receiver}`);
    }

    const gasLimit = await web3.eth.estimateGas({
        from: sender,
        to: receiver,
        // web3.js only uses the latest block.
    })

    return gasLimit
}

module.exports = {
    getGas,
    gasLimit
}