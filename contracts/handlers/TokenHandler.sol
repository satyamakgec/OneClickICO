pragma solidity ^0.4.11;

import '../Token.sol';
import '../generators/TokenGenerator.sol';
import '../data/DataStore.sol';

contract TokenHandler is TokenGenerator {

Token token;

event TokenDistributionSet(uint256 _timestamp, address tokenAddress);
event TokenAllocated(address recipient,uint256 value);
event CrowdFundAddressSet(bool);  

function createToken(uint256 _initialSupply , uint256 _decimal , bytes32 _tokenName , bytes32 _tokenSymbol) returns (bool) {
    generateNewToken(_initialSupply , _decimal ,  _tokenName , _tokenSymbol );
    //token = new Token(_initialSupply , _decimal ,  _tokenName , _tokenSymbol );
    return true;
}

function assignCrowdFundAddress(address tokenAddr) notPlatform {
    token = Token(tokenAddr);
    address _crowdFund = CrowdFundCreators[tokenAddr];
    if(_crowdFund == 0)
    throw;
    token.setCrowdFundAddress(_crowdFund);
    CrowdFundAddressSet(true);


}

function assignTokenDistribution(address tokenAddr, uint _tokenAllocatedToDevelopers, uint _tokenAllocatedToFounders, uint _tokenAllocatedToMarketMaker,  uint _tokenAllocatedToFutureStakeHolers, uint _tokenAllocatedToCrowdFund) returns(bool){
     token = Token(tokenAddr);
    address Addr = token.setTokenDistribution( _tokenAllocatedToDevelopers, _tokenAllocatedToFounders, _tokenAllocatedToMarketMaker, _tokenAllocatedToFutureStakeHolers, _tokenAllocatedToCrowdFund);
    TokenDistributionSet(now,Addr);
    return true;
}

function assignTokenToDeveloper(address tokenAddr, address _to , uint _value)  returns(bool){
    token = Token(tokenAddr);

   if( token.allocateTokenToDevelopers( _to , _value)){
       TokenAllocated(_to,_value);
       return true;
   }else{
       return false;
   }
}

function assignTokenToFounder(address tokenAddr, address _to , uint _value) notPlatform returns(bool){
   
    token = Token(tokenAddr);
   
   if( token.allocateTokenToFounders( _to , _value)){
       TokenAllocated(_to,_value);
       return true;
   }else{
       return false;
   }
}

function assignTokenToMarketMaker(address tokenAddr, address _to , uint _value) notPlatform returns(bool){
    token = Token(tokenAddr);
   
   if( token.allocateTokenToMarketMaker( _to , _value)){
       TokenAllocated(_to,_value);
       return true;
   }else{
       return false;
   }
}

function assignTokenToFutureStakeHoler(address tokenAddr, address _to , uint _value ) notPlatform returns(bool){
   
    token = Token(tokenAddr);
   if( token.allocateTokenToFutureStakeHolers( _to , _value)){
       TokenAllocated(_to,_value);
       return true;
   }else{
       return false;
   }
}

function assignTokenToCrowdFund(address tokenAddr) notPlatform returns(bool){
    
     token = Token(tokenAddr);
    if(token.allocateTokenToCrowdFund()){
       return true;
   }else{
       return false;
   }
}

function getTokensCreatorListLength(address _creator) constant returns(uint256){
    return tokenCreators[_creator].length; 
}

function getTokenDetails(address _creator, uint8 index) constant returns(address, bytes32, bytes32, uint256, uint256){
     address tokenAddress = tokenCreators[_creator][index];
     token = Token(tokenAddress);
     return   (tokenAddress,  token.getTokenName(), token.getTokenSymbol(), token.initialSupply(), token.decimal());
}

function getBalance(address _target , address _tokenAddress) constant returns(uint256) {
 token = Token(_tokenAddress);
 uint256 balance = token.balanceOf(_target);
 return balance;
}

function getCaller() constant returns(address){
    return msg.sender;
}

}
