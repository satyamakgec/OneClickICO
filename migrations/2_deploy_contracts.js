// var Token = artifacts.require("./Token.sol");
// var datastore = artifacts.require("./data/DataStore.sol");
var crowdFundHandler =  artifacts.require("./handlers/CrowdFundHandler.sol");
var tokenHandler =  artifacts.require("./handlers/TokenHandler.sol");
var dataStore =  artifacts.require("./data/DataStore.sol");

module.exports = function(deployer) {

  deployer.deploy(dataStore).then(function(){
      console.log(dataStore.address);
      var addr = dataStore.address;
         deployer.deploy(tokenHandler,addr).then(function(){
               return deployer.deploy(crowdFundHandler,addr).then(function(){  
                });
         });
  });
  
 
};

 