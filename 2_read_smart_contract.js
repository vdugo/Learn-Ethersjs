require('dotenv').config()

const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

// instead of getting the whole ABI, we can put strings of solidity code
// of only the functions that we need. Since DAI follows the ERC20 standard,
// it's easy to get these functions
const DAI_ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
]

// Smart contract address for DAI stablecoin
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
// basically Javascript version of the DAI smart contract so we can read from it
const contractDAI = new ethers.Contract(addressDAI, DAI_ERC20_ABI, provider)

const main = async () => {
    const name = await contractDAI.name()
    const symbol = await contractDAI.symbol()
    const totalSupply = await contractDAI.totalSupply()
    // Random DAI address
    const balanceOf = await contractDAI.balanceOf('0x6B175474E89094C44Da98b954EedeAC495271d0F')
    
    console.log(`Reading ${name} smart contract from the blockchain`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)}`)
    console.log(`Random Ethereum address DAI balance: ${ethers.utils.formatEther(balanceOf)}`)
}

main()