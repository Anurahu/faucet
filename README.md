# Goerli faucet prototype

 Code for a basic Goerli ETH faucet.

## Quick start

* Clone the repo
* Install dependencies

```sh
npm ci
```

* Edit the `.env.sample` file and rename it to `.env`

```env
SENDER_ADDRESS="FAUCET_WALLET"
PRIVATE_KEY="FAUCET_PRIVATE_KEY"
RECEIVER_ADDRESS="RECEIVER_ADDRESS"
GOERLI_ENDPOINT="GOERLI_ENDPOINT"
```

Use a wallet with some Goerli ETH as a faucet.
The `RECEIVER_ADDRESS` is the variable that holds the account to which you send the ETH. It will be taken from the front end later on.

* Run the faucet

```sh
node index
```