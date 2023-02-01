const web3 = require('./provider');

async function getBalance(address) {

    if (!web3.utils.isAddress(address)) {
        throw new Error(`${address} is not a valid address`);
    }

    const balance = await web3.eth.getBalance(address, 'latest');
    return balance
}

module.exports = {
    getBalance
}