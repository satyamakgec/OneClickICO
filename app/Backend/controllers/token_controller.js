var web3 = require('web3');
var tokenHandler = require("./../contracts/handlers/TokenHandler.sol");
Web3 = new web3();
tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0xf8554d78756a4f1147b1e1c28d9a1052f1dc9695');

module.exports.createToken = function(req,res){

  Web3.setProvider(req.web3.currentprovider());
  instrance.createToken(req.initialSupply , req.decimal ,  req.tokenName , req.tokenSymbol).then(function(result){
       console.log(result);
       res.send(result);
  }).catch(function(err){
       console.log(err);
  });

}


module.exports.getAllTokens = function(req,res){
  var address = req.address;
  Web3.setProvider(req.web3.currentprovider());
  instrance.getTokensCreatorListLength(address).then(function(result){
       console.log(result);
       res.send(result);
  }).catch(function(err){
       console.log(err);
  });

}