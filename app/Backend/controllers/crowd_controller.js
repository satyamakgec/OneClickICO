var Token = require('./token_controller');
var async = require('async');
var asyncLoop = require('node-async-loop');
var BigNumber = require("bignumber.js");
var Q = require("q");

var Connection = require("./../config/connection");
var Instance = Connection.crowdInstance;
var Web3 = Connection.Web3;

var address = "0x9227c67a8704691ad416b5f4c0ca88139c9ab829";

module.exports.createCrowdFund= function(req,res){
 var founderAddress = req.body.founderAddress;
 var startDate = parseInt(req.body.startDate);
 var endDate = parseInt(req.body.endDate);
 var tokenAddress= req.body.tokenAddress;
 var tokenConversionRate = req.body.tokenConversionRate;
 var minimumFundingGoal = req.body.minimumFundingGoal;

    var event = Instance.CrowdFundGenerated();
        event.watch(function(err,result){
        if(err){
             console.log(err);
             res.send(err);
        }else{
             console.log(result);
             event.stopWatching();
             Token.setCrowdFundAddress(tokenAddress).then(function(response){
                 res.send({"CrowdFundAddressSet":response,"CrowdFundCreated": result});
             }).catch(function(err){
                 res.send(err);
             });
        }
    });
   
    Instance.createCrowdFund(founderAddress,startDate,endDate,tokenAddress,tokenConversionRate,minimumFundingGoal,{from: address ,gas:4000000});       
     
}