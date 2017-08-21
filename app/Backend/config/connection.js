var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
var CrowdFundHandler = require("./../../../build/contracts/CrowdFundHandler.json");

Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
tokenInstance = tokenHandlerInstance.at('0xae7b90945271f3ebdfc20fca50f958316f74c489');

crowdfundInstance = Web3.eth.contract(CrowdFundHandler.abi); 
crowdInstance = crowdfundInstance.at('0xc024a4a49c1223cf7cb6cd71567b2e1d71deee15');

module.exports=Web3;
module.exports=tokenInstance;
module.exports=crowdInstance;