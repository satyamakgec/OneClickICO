pragma solidity ^0.4.11;

import '../CrowdFund.sol';
import '../generators/CrowdFundGenerators.sol';

contract CrowdFundHandler is CrowdFundGenerators {

    CrowdFund crowdFund;
  
    
   function CrowdFundHandler(address _dataStoreAddress) CrowdFundGenerators(_dataStoreAddress) {
     
   }

function createCrowdFund(address _founderAddress, uint256 _startDate, uint256 _endDate, address _tokenAddress, uint64 _tokenConversionRate, uint256 _minimumFundingGoal ) returns (bool) {
    generateCrowdFund(dataStoreAddress,_founderAddress, _startDate, _endDate, _tokenAddress, _tokenConversionRate, _minimumFundingGoal);
    return true;
}

function crowdsaleStatus(address _crowdFund) constant returns(bool) {
    crowdFund = CrowdFund(_crowdFund);
    return (crowdFund.isCrowdsaleFull());
}

function isGoalAchieved(address _crowdFund) constant returns(bool) {
    crowdFund = CrowdFund(_crowdFund);
    return (crowdFund.isMinimumGoalReached());
}

}
