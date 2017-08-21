pragma solidity ^0.4.11;

import '../CrowdFund.sol';
import '../data/DataStore.sol';

contract CrowdFundGenerators is DataStore {

    CrowdFund newCrowdFund;

    event PlatformAddressChange(uint256 _blockTimestamp, address _newAddress);
    event CrowdFundGenerated(uint256 _blockTimeStamp , address indexed _owner);

    modifier onlyPlatform(){
        require(platform == msg.sender);
        _;
    }

    modifier nonZerAddress(address _to){
        require(_to != 0x0);
        _;
    }
    
    modifier notPlatform(){
        require(msg.sender != platform);
        _;
    }

    function CrowdFundGenerators(){
        platform = msg.sender;
    }

     function generateCrowdFund(address _founderAddress , uint256 _startDate , uint256 _endDate ,address _tokenAddress , uint64 _tokenConversionRate, uint256 _minimumFundingGoal ) returns (bool){
         newCrowdFund = new CrowdFund(_founderAddress , _startDate , _endDate , _tokenAddress ,_tokenConversionRate, _minimumFundingGoal);
         CrowdFundCreators[_tokenAddress] = newCrowdFund;
         CrowdFundGenerated(now ,msg.sender);
         return true;   
    }

}