require('dotenv').config()

const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer (address indexed from, address indexed to, uint amount)"
]

// Smart contract address for DAI stablecoin
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const contract = new ethers.Contract(addressDAI, ERC20_ABI, provider)

const main = async () => {
    // get the latest block
    const block = await provider.getBlockNumber()
    // look at all the transfer events from the last 10 blocks to the latest block
    const transferEvents = await contract.queryFilter('Transfer', block - 10, block)

    console.log(transferEvents)
}

main()