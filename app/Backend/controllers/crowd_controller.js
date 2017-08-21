var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var CrowdFundHandler = require("./../../../build/contracts/CrowdFundHandler.json");
var BigNumber = require("bignumber.js");
var Q = require("q");
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));
crowdfundInstance = Web3.eth.contract(CrowdFundHandler.abi); 
instance = crowdfundInstance.at('0x615665dace3ad94654167685634f7322fdd7de14');
var address = "0x9227c67a8704691ad416b5f4c0ca88139c9ab829";

module.exports.createCrowdFund= function(req,res){
 var founderAddress = req.body.founderAddress;
 var startDate = parseInt(req.body.startDate);
 var endDate = parseInt(req.body.endDate);
 var tokenAddress= req.body.tokenAddress;
 var tokenConversionRate = req.body.tokenConversionRate;
 var minimumFundingGoal = req.body.minimumFundingGoal;

 console.log(startDate);

    var event = instance.CrowdFundGenerated();
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
   
    instance.createCrowdFund(founderAddress,startDate,endDate,tokenAddress,tokenConversionRate,minimumFundingGoal,{from: address ,gas:4000000});          
}