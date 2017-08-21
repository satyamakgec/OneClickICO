var async = require('async');
var asyncLoop = require('node-async-loop');
var web3 = require('web3');
var TokenHandler = require("./../../../build/contracts/TokenHandler.json");
var BigNumber = require("bignumber.js");
var Q = require("q");
Web3 = new web3();
Web3.setProvider( new web3.providers.HttpProvider("http://localhost:8545"));

tokenHandlerInstance = Web3.eth.contract(TokenHandler.abi); 
instance = tokenHandlerInstance.at('0x45a97f88ac00f3d41c0baf19a77942e40398a15d');
//Web3.eth.defaultAccount = Web3.eth.accounts[0];
var address = "0x9227c67a8704691ad416b5f4c0ca88139c9ab829";

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