var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
var BigNumber = require("bignumber.js");
var Q = require("q");
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0x633e43273740255ecb3d76fdfccb049a562230d8');
//Web3.eth.defaultAccount = Web3.eth.accounts[0];
var address = "0x9227c67a8704691ad416b5f4c0ca88139c9ab829";

module.exports.getCoinbase = function (req,res){
Web3.eth.getCoinbase(function(err,coinbase){
      if(err){
        res.send(err);
      }else{
        res.send(coinbase);
      }
});
}

module.exports.getAllTokens = function(req,res){
  var address = req.body.address;
  //Web3.setProvider(req.web3.currentprovider());
  var temp = [];
   var length = instance.getTokensCreatorListLength(address,{from:address});
               console.log(length);
                var array = [];
                len = length.toNumber();
                for(var i=0; i<=len-1; i++) {
                array.push(i);
                }
                asyncLoop(array,0,array.length - 1,function(index,next){
                    console.log(index);
                     var data = instance.getTokenDetails(address,index,{from:address});
                            temp.push(data);
                            console.log(data);
                            if(index < array.length-1){
                                 next();
                            }else{
                                res.json(temp);
                            }   
                },function(error){
                            console.log(error);
                            res.json({'message':'client has not created tokens','status': false});
                });
}


module.exports.createToken= function(req,res){
 var initialSupply = req.body.initialSupply;
 var decimal = req.body.decimal;
 var tokenName= req.body.tokenName;
 var tokenSymbol= req.body.tokenSymbol;

    var event = instance.TokenGenerated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             res.send(err);
        }else{
             console.log(result);
             event.stopWatching();
             res.send(result);
        }
    });
   
         instance.createToken(initialSupply,decimal,tokenName,tokenSymbol,{from: address ,gas:4000000});          
}

module.exports.defaultAddress = function(req,res){
  var address = Web3.eth.defaultAccount;
  res.send(address);
}


module.exports.setTokenDistribution = function(req,res){
    var tokenAddress = req.body.tokenAddress;
    var tokenAllocatedToDevelopers = req.body.devShare;
    var tokenAllocatedToFounders = req.body.foundersShare;
    var tokenAllocatedToMarketMaker = req.body.marketmakersShare;
    var tokenAllocatedToFutureStakeHolers = req.body.futureStakeholdersShare;
    var tokenAllocatedToCrowdFund = req.body.crowdfundShare;
     console.log(address);
    var event = instance.TokenDistributionSet();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             res.send(err);
        }else{
             console.log(result);
             event.stopWatching();
             res.send(result);
        }
    });

    instance.assignTokenDistribution(tokenAddress, tokenAllocatedToDevelopers, tokenAllocatedToFounders, tokenAllocatedToMarketMaker, tokenAllocatedToFutureStakeHolers, tokenAllocatedToCrowdFund,{from: address ,gas:4000000});
}

module.exports.setCrowdFundAddress = function(req,res){
    var crowdfundAddress = req.body.crowdfundAddress;
    instance.assignCrowdFundAddress(crowdfundAddress);
}

module.exports.distributeTokens = function(req,res){
    var tokenAddress = req.body.tokenAddress;
    var to = req.body.recipientAddress;
    var value = req.body.NumberOfTokens;
    var flag = req.body.flag; 

    switch(flag){
        case '1' : distributeTokenToDeveloper(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '2' : distributeTokenToFounder(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '3' : distributeTokenToFutureStakeholder(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '4' : distributeTokenToMarketMaker(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        default :
        res.send("This is invalid option!");
    }
}

function distributeTokenToDeveloper(tokenAddress,to,value){
 
    var deferred = Q.defer(); 
    var event = instance.TokenAllocated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             deferred.reject(err);
        }else{
             console.log(result);
             event.stopWatching();
             deferred.resolve(result);
        }
    });

    
   instance.assignTokenToDeveloper(tokenAddress,to,value,{from : address, gas : 4000000});
}

function distributeTokenToFounder(tokenAddress,to,value){
 var deferred = Q.defer(); 

    var event = instance.TokenAllocated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             deferred.reject(err);
        }else{
             console.log(result);
             event.stopWatching();
            deferred.resolve(result);
        }
    });

    
   instance.assignTokenToFounder(tokenAddress,to,value,{from : address, gas : 4000000});
}

function distributeTokenToFutureStakeholder(tokenAddress,to,value){
  var deferred = Q.defer(); 

    var event = instance.TokenAllocated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             deferred.reject(err);
        }else{
             console.log(result);
             event.stopWatching();
              deferred.resolve(result);
        }
    });

    
   instance.assignTokenToFutureStakeHoler(tokenAddress,to,value,{from : address, gas : 4000000});
}

function distributeTokenToMarketMaker(tokenAddress,to,value){
 var deferred = Q.defer(); 


    var event = instance.TokenAllocated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             deferred.reject(err);
        }else{
             console.log(result);
             event.stopWatching();
             deferred.resolve(result);
        }
    });

    
   instance.assignTokenToMarketMaker(tokenAddress,to,value,{from : address, gas : 4000000});
}