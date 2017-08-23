var async = require('async');
var asyncLoop = require('node-async-loop');
var BigNumber = require("bignumber.js");
var Q = require("q");
var Connection = require("./../config/connection");
//console.log(Connection.data.tokenInstance);
var Instance = Connection.data.tokenInstance;
//console.log("Instance",Instance);
var Web3 = Connection.Web3;
//Web3.eth.defaultAccount = Web3.eth.accounts[0];
var address = "0xd3671e8df0f5a9414a58108a20c40a804683f47f";

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
   var length = Instance.getTokensCreatorListLength(address,{from:address});
               console.log("length",length);
                var array = [];
                len = length.toNumber();
                for(var i=0; i<=len-1; i++) {
                array.push(i);
                }
                asyncLoop(array,0,array.length - 1,function(index,next){
                    console.log("index",index);
                     var data = Instance.getTokenDetails(address,index,{from:address});
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
 var sender = req.body.address;

 console.log("request params",req.body);

    var event = Instance.TokenGenerated();
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
    console.log("before func call");
         Instance.createToken(initialSupply,decimal,tokenName,tokenSymbol,{from: sender ,gas:4000000});          
    console.log("before func call");  
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
    var event = Instance.TokenDistributionSet();
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

    Instance.assignTokenDistribution(tokenAddress, tokenAllocatedToDevelopers, tokenAllocatedToFounders, tokenAllocatedToMarketMaker, tokenAllocatedToFutureStakeHolers, tokenAllocatedToCrowdFund,{from: address ,gas:4000000});
}

module.exports.setCrowdFundAddress = function(req,res){
    var crowdfundAddress = req.body.crowdfundAddress;
    Instance.assignCrowdFundAddress(crowdfundAddress);
}

module.exports.distributeTokens = function(req,res){
    var tokenAddress = req.body.tokenAddress;
    var to = req.body.recipientAddress;
    var value = req.body.NumberOfTokens;
    var flag = req.body.flag; 
    
    console.log(req.body.flag);

    switch(flag){
        case '1' : 
        console.log(1);
        distributeTokenToDeveloper(tokenAddress,to,value).then(function(response){
                     
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '2' :
        
        console.log(2);
        distributeTokenToFounder(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '3' : 
        
        console.log(3);
        distributeTokenToFutureStakeholder(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        case '4' : 
        
        console.log(4);
        distributeTokenToMarketMaker(tokenAddress,to,value).then(function(response){
              
                res.send(response);
              
        }).catch(function(err){
              res.send(err);
        });
        break;
        default :

        console.log(5);
        res.send("This is invalid option!");
    }
}

function distributeTokenToDeveloper(tokenAddress,to,value){
    console.log("inside distributeTokenToDeveloper()");
    var deferred = Q.defer(); 
    var event = Instance.TokenAllocated();
        event.watch(function(err,result){
        if(err){
             console.log("this is the err",err);
             deferred.reject(err);
        }else{
             console.log("this is the result",result);
             event.stopWatching();
             deferred.resolve(result);
        }
    });
   
   var _value = new BigNumber(value).times(new BigNumber(10).pow(18));
   Instance.assignTokenToDeveloper(tokenAddress,to,_value,{from : address, gas : 4000000});
   return deferred.promise;
}

function distributeTokenToFounder(tokenAddress,to,value){
 var deferred = Q.defer(); 

    var event = Instance.TokenAllocated();
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

   var _value = new BigNumber(value).times(new BigNumber(10).pow(18));    
   Instance.assignTokenToFounder(tokenAddress,to,_value,{from : address, gas : 4000000});
    return deferred.promise;
}

function distributeTokenToFutureStakeholder(tokenAddress,to,value){
  var deferred = Q.defer(); 

    var event = Instance.TokenAllocated();
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

   var _value = new BigNumber(value).times(new BigNumber(10).pow(18)); 
   Instance.assignTokenToFutureStakeHoler(tokenAddress,to,_value,{from : address, gas : 4000000});
    return deferred.promise;
}

function distributeTokenToMarketMaker(tokenAddress,to,value){
 var deferred = Q.defer(); 


    var event = Instance.TokenAllocated();
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

    var _value = new BigNumber(value).times(new BigNumber(10).pow(18));
   Instance.assignTokenToMarketMaker(tokenAddress,to,_value,{from : address, gas : 4000000});
    return deferred.promise;
}


module.exports.getBalance = function(req,res){
    var target = req.body.target;
    var tokenAddress = req.body.tokenAddress;

    var balance = Instance.getBalance(target,tokenAddress);
        res.send(balance);
}

module.exports.setCrowdFundAddress= function(tokenAddress){
 
 var deferred = Q.defer(); 
 
     var event = Instance.CrowdFundAddressSet();
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


 Instance.assignCrowdFundAddress(tokenAddress,{from: address ,gas:4000000});

 return deferred.promise;        

}