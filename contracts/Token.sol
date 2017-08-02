pragma solidity ^0.4.11;

import './helpers/Ownable.sol';
import './lib/safeMath.sol';


contract Token is Ownable , BasicToken , TokenHandlers{

   string public tokenName;
   string public tokenSymbol;
   uint8 public decimal;

   uint256 public initialSupply ;

   address public crowdFundAddress;
   

   uint public tokenAllocatedToDevlepers ;
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

    function Token ( uint _initialSupply , uint8 _decimal , string _tokenName , string _tokenSymbol ){
        owner = msg.sender;
        initialSupply = _initialSupply;
        decimal = _decimal;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
    }

    function setCrowdFundAddress(address _crowdFund) onlyOwner isCrowdFund nonZeroAddress(_crowdFund) external{  // call one Time
        crowdFundAddress = _crowdFund;
        isCrowdFundAddressSet = !isCrowdFundAddressSet;
    }

    function assignTokenDistribution(uint _tokenAllocatedToDevlepers, uint _tokenAllocatedToFounders, uint _tokenAllocatedToMarketMaker,  uint _tokenAllocatedToFutureStakeHolers, uint _tokenAllocatedToCrowdFund)onlyOwner isTokenDistribution returns(bool){
        uint totalTokens = _tokenAllocatedToCrowdFund + _tokenAllocatedToDevlepers + _tokenAllocatedToFounders + _tokenAllocatedToFutureStakeHolers + _tokenAllocatedToMarketMaker;
        assert(totalTokens == 100);
        tokenAllocatedToDevlepers = ((_tokenAllocatedToDevlepers).mul(initialSupply)).div(100);
        tokenAllocatedToFounders = ((_tokenAllocatedToFounders).mul(initialSupply)).div(100);
        tokenAllocatedToMarketMaker = ((_tokenAllocatedToMarketMaker).mul(initialSupply).div(100);
        tokenAllocatedToFutureStakeHolers = ((_tokenAllocatedToFutureStakeHolers).mul(initialSupply)).div(100);
        tokenAllocatedToCrowdFund = ((_tokenAllocatedToCrowdFund).mul(initialSupply)).div(100);
        balances[owner] = tokenAllocatedToFounders;
        isTokenDistributionSet = !isTokenDistributionSet;
        AssignedToken(now , owner);
        return true;
    }

    function allocateTokenTodevelopers(address _to , uint value) onlyOwner returns (bool){
        if(tokenAllocatedToDevlepers >= value){
            balances[_to] = balances[_to].add(value);
            tokenAllocatedToDevlepers = tokenAllocatedToDevlepers.sub(value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function tokenAllocatedToFounders(address _to , uint value) onlyOwner returns (bool){
        if(tokenAllocatedToFounders >= value){
            balances[_to] = balances[_to].add(value);
            tokenAllocatedToFounders = tokenAllocatedToFounders.sub(value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function tokenAllocatedToMarketMaker(address _to , uint value) onlyOwner returns (bool){
        if(tokenAllocatedToMarketMaker >= value){
            balances[_to] = balances[_to].add(value);
            tokenAllocatedToMarketMaker = tokenAllocatedToMarketMaker.sub(value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }

     function tokenAllocatedToFutureStakeHolers(address _to , uint value) onlyOwner returns (bool){
        if(tokenAllocatedToFutureStakeHolers >= value){
            balances[_to] = balances[_to].add(value);
            tokenAllocatedToFutureStakeHolers = tokenAllocatedToFutureStakeHolers.sub(value);
            TokenAllocation(_to , _value);
            return true;
        }else{
            return false;
        }
    }
    
    function tokenAllocatedToCrowdFund() onlyCrowdFund returns (bool){
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