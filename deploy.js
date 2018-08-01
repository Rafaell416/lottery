const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
const config = require('./config')
const chalk = require('chalk') //color outputs
const provider = new HDWalletProvider( config.mnemonic, config.networkUrl )
const web3 = new Web3(provider)

const deploy = async () => {
  try {
    log(chalk.blue('Attempting to deploy from account', accounts[0]))

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: '0x' + bytecode })
      .send({ gas: '1000000', from: accounts[0] })

    log(chalk.green('Contract deployed to', result.options.address))
  } catch (e) {
    log(chalk.red('There was an error deploying the contract ==>', e))
    process.exit(1)
  }
}

deploy()
