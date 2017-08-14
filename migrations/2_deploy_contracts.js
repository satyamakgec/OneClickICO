// var Token = artifacts.require("./Token.sol");
// var datastore = artifacts.require("./data/DataStore.sol");
// var tokenGenerator =  artifacts.require("./generators/TokenGenerator.sol");
var tokenHandler =  artifacts.require("./handlers/TokenHandler.sol");

module.exports = function(deployer) {
 return deployer.deploy(tokenHandler);
};
