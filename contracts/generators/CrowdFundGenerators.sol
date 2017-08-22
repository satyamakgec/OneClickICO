pragma solidity ^0.4.11;

import '../CrowdFund.sol';
import '../data/DataStore.sol';

contract CrowdFundGenerators {

    CrowdFund newCrowdFund;
    DataStore dataStore;
    address dataStoreAddress;
    
    event PlatformAddressChange(uint256 _blockTimestamp, address _newAddress);
    event CrowdFundGenerated(uint256 _blockTimeStamp , address  _owner, address _crowdfundAddress);
    event Created(address);

    modifier onlyPlatform(){
        
        require(dataStore.platform() == msg.sender);
        _;
    }

    modifier nonZerAddress(address _to){
        require(_to != 0x0);
        _;
    }
    
    modifier notPlatform(){
        require(msg.sender != dataStore.platform());
        _;
    }

    function CrowdFundGenerators(address _dataStoreAddress){
        dataStoreAddress = _dataStoreAddress;
        dataStore = DataStore(_dataStoreAddress); 
    }

     function generateCrowdFund(address _dataStoreAddress, address _founderAddress , uint256 _startDate , uint256 _endDate ,address _tokenAddress , uint64 _tokenConversionRate, uint256 _minimumFundingGoal ) returns (bool){
         newCrowdFund = new CrowdFund(_founderAddress , _startDate , _endDate , _tokenAddress ,_tokenConversionRate, _minimumFundingGoal);
         dataStore = DataStore(_dataStoreAddress);
         dataStore.pushToCrowdFundCreators(_tokenAddress,newCrowdFund);
         CrowdFundGenerated(now , msg.sender, newCrowdFund);
         return true;   
    }

}