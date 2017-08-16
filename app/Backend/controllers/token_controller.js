var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0x7072fdddf032f31b3241e457cc2b9cf2bd04fb16');

// module.exports.createToken = function(req,res){
//   Web3.setProvider(req.web3.currentprovider());
//   instance.createToken(req.initialSupply , req.decimal ,  req.tokenName , req.tokenSymbol).then(function(result){
//        console.log(result);
//        res.send(result);
//   }).catch(function(err){
//        console.log(err);
//   });

// }


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
 var initialSupply = req.body.initialSupply;
 var decimal = req.body.decimal;
 var tokenName= req.body.tokenName;
 var tokenSymbol= req.body.tokenSymbol;
 console.log(instance);
  instance.createToken(initialSupply,decimal,tokenName,tokenSymbol,{from : '0x98b8cab2a36cad596f1d74449d00095e5f3c15f9',gas : 4000000}).then(function(result){
        console.log(result);
        res.send(result);
      }).catch(function(err){
        res.send(err);
      });
  }