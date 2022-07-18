require('dotenv').config()

const { ethers } = require('ethers')
// Using Kovan testnet
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${process.env.INFURA_ID}`)

// Kovan testnet account
const myAccount = '0xF59Bcd79Ed8A28d2920E2d92710E85a5C2fff384' // sender
const account2 = '0x620583C75BB474E06485893B795b0883b5816D10' // recipient

// Kovan testnet Metamask wallet private key (sender private key)
const privateKey = process.env.PRIV_KEY

const wallet = new ethers.Wallet(privateKey, provider)

const main = async () => {
    // show the balance before the transaction
    const senderBalanceBefore = await provider.getBalance(myAccount)
    const receiverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before transaction: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`\nReceiver balance before transaction: ${ethers.utils.formatEther(receiverBalanceBefore)}`)

    // sending Ether from myAccount to account2
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025"),
        //gasLimit: "50000"
    })

    // the transaction gets submitted immediately, however
    // we must wait for the transaction to get mined to be included
    // in the blockchain before we see the details
    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(myAccount)
    const receiverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after transaction: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`\nReceiver balance after transaction: ${ethers.utils.formatEther(receiverBalanceAfter)}`)
}

main()