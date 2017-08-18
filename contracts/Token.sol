pragma solidity ^0.4.11;

import './helpers/Ownable.sol';
import './lib/safeMath.sol';
import './helpers/BasicToken.sol';

contract Token is Ownable , BasicToken{

   bytes32 public tokenName ;
   bytes32 public tokenSymbol ;
   uint8 public decimal;
   uint256 public initialSupply ;
   address public crowdFundAddress;
   

   uint public tokenAllocatedToDevelopers ;
   uint public tokenAllocatedToFounders ;
   uint public tokenAllocatedToMarketMaker;
   uint public tokenAllocatedToFutureStakeHolers;
   uint public tokenAllocatedToCrowdFund;

   bool public isCrowdFundAddressSet = false ;
   bool public isTokenAllocatedToCrowdFund = false;
   bool public isTokenDistributionSet = false;

   modifier onlyCrowdFund(){
       require(msg.sender == crowdFundAddress);
       _;
   }    

   modifier nonZeroAddress(address _to){
       require(_to != 0x0);
       _;
   } 

   modifier isCrowdFund(){
       require(isCrowdFundAddressSet == false);
       _;
   } 

   modifier isTokenDistribution(){
       require(isTokenDistributionSet == false);
       _;
   }

   event  AssignedToken(uint _blockTimeStamp , address indexed _by);
   event  TokenAllocation(address indexed _to , uint _value);
   event  TokenAllocateToCrowdFund(uint _blockTimeStamp);

    function Token ( uint _initialSupply , uint8 _decimal , bytes32 _tokenName , bytes32 _tokenSymbol ){
        owner = msg.sender;
        initialSupply = _initialSupply;
        decimal = _decimal;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
    }
    
    function getTokenName() constant returns(bytes32){
      return tokenName;    
    }
    function getTokenSymbol() constant returns(bytes32){
        return tokenSymbol;
    }
    
    function setCrowdFundAddress(address _crowdFund) onlyOwner isCrowdFund nonZeroAddress(_crowdFund) external{  // call one Time
        crowdFundAddress = _crowdFund;
        isCrowdFundAddressSet = !isCrowdFundAddressSet;
    }

    function setTokenDistribution(uint _tokenAllocatedToDevelopers, uint _tokenAllocatedToFounders, uint _tokenAllocatedToMarketMaker,  uint _tokenAllocatedToFutureStakeHolers, uint _tokenAllocatedToCrowdFund) onlyOwner isTokenDistribution returns(address){
        uint totalTokens = _tokenAllocatedToCrowdFund + _tokenAllocatedToDevelopers + _tokenAllocatedToFounders + _tokenAllocatedToFutureStakeHolers + _tokenAllocatedToMarketMaker;
        assert(totalTokens == 100);
        tokenAllocatedToDevelopers = ((_tokenAllocatedToDevelopers).mul(initialSupply)).div(100);
        tokenAllocatedToFounders = ((_tokenAllocatedToFounders).mul(initialSupply)).div(100);
        tokenAllocatedToMarketMaker = ((_tokenAllocatedToMarketMaker).mul(initialSupply)).div(100);
        tokenAllocatedToFutureStakeHolers = ((_tokenAllocatedToFutureStakeHolers).mul(initialSupply)).div(100);
        tokenAllocatedToCrowdFund = ((_tokenAllocatedToCrowdFund).mul(initialSupply)).div(100);
        balances[owner] = tokenAllocatedToFounders;
        isTokenDistributionSet = !isTokenDistributionSet;
        AssignedToken(now , owner);
        return owner;
    }

    function allocateTokenToDevelopers(address _to , uint _value) onlyOwner returns (bool){
        if(tokenAllocatedToDevelopers >= _value){
            balances[_to] = balances[_to].add(_value);
            tokenAllocatedToDevelopers = tokenAllocatedToDevelopers.sub(_value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function allocateTokenToFounders(address _to , uint _value) onlyOwner returns (bool){
        if(tokenAllocatedToFounders >= _value){
            balances[_to] = balances[_to].add(_value);
            tokenAllocatedToFounders = tokenAllocatedToFounders.sub(_value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function allocateTokenToMarketMaker(address _to , uint _value) onlyOwner returns (bool){
        if(tokenAllocatedToMarketMaker >= _value){
            balances[_to] = balances[_to].add(_value);
            tokenAllocatedToMarketMaker = tokenAllocatedToMarketMaker.sub(_value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function allocateTokenToFutureStakeHolers(address _to , uint _value) onlyOwner returns (bool){
        if(tokenAllocatedToFutureStakeHolers >= _value){
            balances[_to] = balances[_to].add(_value);
            tokenAllocatedToFutureStakeHolers = tokenAllocatedToFutureStakeHolers.sub(_value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }
    
    function allocateTokenToCrowdFund() onlyCrowdFund returns (bool){
        if(!isTokenAllocatedToCrowdFund){
            balances[crowdFundAddress] = tokenAllocatedToCrowdFund;
            tokenAllocatedToCrowdFund = 0;
            TokenAllocateToCrowdFund(now);
            return true;
        }else{
            return false;
        }
    }
    

}