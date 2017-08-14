pragma solidity ^0.4.11;

import '../Token.sol';
import '../generators/TokenGenerator.sol';
import '../data/DataStore.sol';

contract TokenHandler is TokenGenerator{

Token token;

function createToken(uint256 _initialSupply , uint8 _decimal , bytes32 _tokenName , bytes32 _tokenSymbol) returns (bool){
    generateNewToken(_initialSupply , _decimal ,  _tokenName , _tokenSymbol );
    return true;
}

function assignCrowdFundAddress(address _crowdFund , address tokenAddr) notPlatform {
    
    token = Token(tokenAddr);
    token.setCrowdFundAddress(_crowdFund);

}

function assignTokenDistribution(address tokenAddr, uint _tokenAllocatedToDevelopers, uint _tokenAllocatedToFounders, uint _tokenAllocatedToMarketMaker,  uint _tokenAllocatedToFutureStakeHolers, uint _tokenAllocatedToCrowdFund , address _platform) onlyPlatform(_platform) returns(bool){
     token = Token(tokenAddr);
    token.setTokenDistribution( _tokenAllocatedToDevelopers, _tokenAllocatedToFounders, _tokenAllocatedToMarketMaker, _tokenAllocatedToFutureStakeHolers, _tokenAllocatedToCrowdFund);
    return true;
}

function assignTokenToDevelopers(address tokenAddr, address _to , uint _value) notPlatform returns(bool){
    token = Token(tokenAddr);

   if( token.allocateTokenToDevelopers( _to , _value)){
       return true;
   }else{
       return false;
   }
}

function assignTokenToFounders(address tokenAddr, address _to , uint _value) notPlatform returns(bool){
   
    token = Token(tokenAddr);
   
   if( token.allocateTokenToFounders( _to , _value)){
       return true;
   }else{
       return false;
   }
}

function assignTokenToMarketMaker(address tokenAddr, address _to , uint _value) notPlatform returns(bool){
    token = Token(tokenAddr);
   
   if( token.allocateTokenToMarketMaker( _to , _value)){
       return true;
   }else{
       return false;
   }
}

function assignTokenToFutureStakeHolers(address tokenAddr, address _to , uint _value ) notPlatform returns(bool){
   
    token = Token(tokenAddr);
   if( token.allocateTokenToFutureStakeHolers( _to , _value)){
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

function getTokensCreatorListLength(address _creator) returns(uint256){
    return tokenCreators[_creator].length; 
}

function getTokenDetails(address _creator, uint8 index) returns(address, bytes32, bytes32, uint256, uint8){
     address tokenAddress = tokenCreators[_creator][index];
     token = Token(tokenAddress);
     return   (tokenAddress,  token.getTokenName(), token.getTokenSymbol(), token.initialSupply(), token.decimal());
}

}
