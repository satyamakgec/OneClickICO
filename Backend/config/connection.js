var web3 = require('web3');
var TokenHandler = require("./../../build/contracts/TokenHandler.json");
var CrowdFundHandler = require("./../../build/contracts/CrowdFundHandler.json");
console.log(1);
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));
// var Web3 = new web3(web3.currentProvider);
// console.log(Web3);
module.exports.setWeb3Provider = function(req,res){
      var web3 = req.body.web3;
    //   var Web3 = new web3(web3.currentProvider);
       console.log(web3);
}
tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
tokenInstance = tokenHandlerInstance.at('0xeff42764eec0f05895b339dde8ba17245dba10c5');
// console.log(tokenInstance);
crowdfundInstance = Web3.eth.contract(CrowdFundHandler.abi); 
crowdInstance = crowdfundInstance.at('0x2cf681fdfc06ab8bc3e3d9c9290cfda4b866e4c4');

// dataStoreInstance = Web3.eth.contract(CrowdFundHandler.abi); 
// dataInstance = dataStoreInstance.at('0x29B1d3cB5a1CdeDA2a1028F29A5a8B1fa5f174b7');

module.exports.data = {
    "web3": Web3,
    "tokenInstance" : tokenInstance,
    "crowdInstance" : crowdInstance
 };
//module.exports=tokenInstance;
//module.exports=crowdInstance;

// 0x29B1d3cB5a1CdeDA2a1028F29A5a8B1fa5f174b7 – DataStore

// 0xeff42764eec0f05895b339dde8ba17245dba10c5 – TokenHandler

// 0x2cf681fdfc06ab8bc3e3d9c9290cfda4b866e4c4 - crowdFundHandler
