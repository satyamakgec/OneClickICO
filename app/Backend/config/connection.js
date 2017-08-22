var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
var CrowdFundHandler = require("./../../../build/contracts/CrowdFundHandler.json");
console.log(1);
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
tokenInstance = tokenHandlerInstance.at('0xc35875f8c6432ceea9e4f9b67b4b268b8c8e963e');
//console.log(tokenInstance);
crowdfundInstance = Web3.eth.contract(CrowdFundHandler.abi); 
crowdInstance = crowdfundInstance.at('0x397da02717cca6ca4c06665940bbc44e77e5be37');

// dataStoreInstance = Web3.eth.contract(CrowdFundHandler.abi); 
// dataInstance = dataStoreInstance.at('0x6a02b45a91f088cdbdf2757b1d282dbf982beb83');

module.exports.data = {
    "web3": Web3,
    "tokenInstance" : tokenInstance,
    "crowdInstance" : crowdInstance
 };
//module.exports=tokenInstance;
//module.exports=crowdInstance;