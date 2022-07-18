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

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
]

const chainlinkAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'
const contract = new ethers.Contract(chainlinkAddress, ERC20_ABI, provider)

const main = async () => {
    
    const senderBalanceBefore = await contract.balanceOf(myAccount)
    const receiverBalanceBefore = await contract.balanceOf(account2)

    console.log(`\nSender balance before transaction: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`\nReceiver balance before transaction: ${ethers.utils.formatEther(receiverBalanceBefore)}`)
     
    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, senderBalanceBefore)

    await tx.wait()

    console.log(tx)

    const senderBalanceAfter = await contract.balanceOf(myAccount)
    const receiverBalanceAfter = await contract.balanceOf(account2)

    console.log(`\nSender balance after transaction: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`\nReceiver balance after transaction: ${ethers.utils.formatEther(receiverBalanceAfter)}`)
}

main()