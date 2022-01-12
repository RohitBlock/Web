solc= require("solc");
fs = require("fs");

Web3 = require("web3");
let web3= new Web3( new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/6b143c3dfe1e468e9730e207e6a51775"))


let fileContent= fs.readFileSync("../contracts/demo.sol").toString();
console.log(fileContent);

var input = {
    language: "Solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },

    settings: {
        outputSelection: {
            "*": {
               "*": ["*"]
            },
        },
    },
};


var output= JSON.parse(solc.compile(JSON.stringify(input)));
ABI= output.contracts["demo.sol"]["demo"].abi;
bytecode= output.contracts["demo.sol"]["demo"].evm.bytecode.object;

console.log("abi" , ABI);
console.log("bytecode" , bytecode);


contract = new web3.eth.Contract(ABI);

web3.eth.getAccount().then((accounts)=>{
    console.log("Accounts", accounts);
    defaultAccount= accounts[0];
    contract
    .deploy({data:bytecode})
    .send({from:defaultAccount,gas:500000})
    .on("receive",(receive)=>{
        console.log("contract Address", receive.contractAddress);
    })
    .then((demoContract)=>{
        demoContract.methods.getTransactionCount().call((err,data)=>{
            console.log("initial Value:", data)
        });
    });

})
