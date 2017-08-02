pragma solidity ^0.4.11;


contract TokenHandler is Token , TokenGenerator{

   function TokenHandler(){
       platform = msg.sender;
   }

contract createToken(uint _initialSupply , uint8 _decimal , string _tokenName , string _tokenSymbol) returns (bool){
    generateNewToken(uint _initialSupply , uint8 _decimal , string _tokenName , string _tokenSymbol );
    return true;
}

function setCrowdFundAddress( address )


}