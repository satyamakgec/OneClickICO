// var Token = artifacts.require("./Token.sol");
// var datastore = artifacts.require("./data/DataStore.sol");
var crowdFundHandler =  artifacts.require("./handlers/CrowdFundHandler.sol");
var tokenHandler =  artifacts.require("./handlers/TokenHandler.sol");

module.exports = function(deployer) {
  deployer.deploy(tokenHandler);
  deployer.deploy(crowdFundHandler);
};
