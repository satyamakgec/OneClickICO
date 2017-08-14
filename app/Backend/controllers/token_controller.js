var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0xc501f2df181e5d5bdba770dbf46e271a2e0f6dc7');

module.exports.createToken = function(req,res){
  Web3.setProvider(req.web3.currentprovider());
  instance.createToken(req.initialSupply , req.decimal ,  req.tokenName , req.tokenSymbol).then(function(result){
       console.log(result);
       res.send(result);
  }).catch(function(err){
       console.log(err);
  });

}


module.exports.getAllTokens = function(req,res){
  var address = req.address;
  //Web3.setProvider(req.web3.currentprovider());

    instance.getTokensCreatorListLength(address).then(function(length){
                var array = [];
                for(var i=0; i<=length-1; i++) {
                array.push(i);
                }
                asyncLoop(array,0,array.length - 1,function(index,next){
                    console.log(index);
                      instance.getTokenDetails(address,index).then(function(data){
                            temp.push(data);
                            console.log(data);
                            if(index < array.length-1){
                                 next();
                            }else{
                                res.json(temp);
                            }
                         }).catch(function(err){
                             res.json(err);
                         });
                            
                },function(error){
                            console.log(error);
                            res.json({'message':'client has not created tokens','status': false});
                });
          
    }).catch(function(err){
        res.json({'message':'invalid address','status': false});
    });

}


module.exports.createToken= function(req,res){
 var initialSupply = req.initialSupply;
 var decimal = req.decimal;
 var tokenName= req.tokenName;
 var tokenSymbol= req.tokenSymbol;

  instance.createToken(initialSupply,decimal,tokenName,tokenSymbol).then(function(result){
        console.log(result);
        res.send(result);
      }).catch(function(err){
        res.send(err);
      });
  }