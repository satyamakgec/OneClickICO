var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
var BigNumber = require("bignumber.js");

Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0x301360e80099ee949ad2ce4066bf4745962f9cf6');
//Web3.eth.defaultAccount = Web3.eth.accounts[0];
var address = "0xc43c4b049ff1148279a67d9af08621ab95078b93";

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
   
         instance.createToken(initialSupply,decimal,tokenName,tokenSymbol,{from:"0xc43c4b049ff1148279a67d9af08621ab95078b93" ,gas:4000000});          
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