require('dotenv').config()

const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

const main = async () => {
    // get latest block
    const block = await provider.getBlockNumber()
    console.log(`Block number: ${block}`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log('First transaction in the block:')
    console.log(transactions[0])
}

main()