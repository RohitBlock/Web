module.exports = function(callback) {
const Web3 = require('web3');
const MyContract = require('./build/contracts/demo.json')

const HDWalletProvider = require('@truffle/hdwallet-provider');

const address ="0xd88ac265b7b0560d3d031853c39bca972d636d9a"
const receiver ="0x764c4c17809a6b5a3d689EAcd75519f8992853Db"
const privateKey = ""


const init= async () =>{

  const provider  = new HDWalletProvider(privateKey,
    "https://ropsten.infura.io/v3/6b143c3dfe1e468e9730e207e6a51775"
    );

 const web3 = new Web3(provider)

//*************USING WEB3 TO DEPLOY AND RETRIVE THE VALUE AT SAME TIME  */

//let contract = new web3.eth.Contract(MyContract.abi);
//
 //contract = await contract.deploy({data: MyContract.bytecode}).send({from: address})
//
 //await contract.methods.addToBlockchain(receiver,50,"hello everyone ").send({from: address })
//
 //const result = await contract.methods.getAllTransactions().call();
//
 //console.log(result);


//*************USING WEB3JS TO INTERACT WITH DEPLOYED CONTRACT */

 var contactaddresspoint ='0xc476809d7a6db1ddf00407ab52b8df7f23cfa0eb'
 let contract = new web3.eth.Contract(MyContract.abi,contactaddresspoint);
 const result = await contract.methods.getAllTransactions().call()
 console.log(result);

}

init();
}
