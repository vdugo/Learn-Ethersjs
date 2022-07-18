require('dotenv').config()

const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

// got a random recent transaction address from etherscan
const randomAddress = "0x2455B97516b0b8Dc58af4a0dBED8543cCd731042"

const main = async () => {
    const randomBalance = await provider.getBalance(randomAddress)
    console.log(`\nETH Balance of ${randomAddress} is ${ethers.utils.formatEther(randomBalance)} ETH\n`)
}

main()

