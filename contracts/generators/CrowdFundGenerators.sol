pragma solidity ^0.4.11;

// import '../CrowdFund.sol';
// import '../data/DataStore.sol';

// contract CrowdFundGenerators is DataStore {

//     CrowdFund newCrowdFund;

//     event PlatformAddressChange(uint256 _blockTimestamp, address _newAddress);
//     event CrowdFundGenerated(uint256 _blockTimeStamp , address indexed _owner);

//     modifier onlyPlatform(){
//         require(platform == msg.sender);
//         _;
//     }

//     modifier nonZerAddress(address _to){
//         require(_to != 0x0);
//         _;
//     }
    
//     modifier notPlatform(){
//         require(msg.sender != platform);
//         _;
//     }

//     function CrowdFundGenerators(){
//         platform = msg.sender;
//     }

//      function generateCrowdFund(address _founderAddress , uint8 _duration , uint256 _startdate ,address _tokenAddress ) returns (bool){
//          newCrowdFund = new CrowdFund(address _founderAddress , uint8 _duration);
//          CrowdFundCreators[msg.sender][_tokenAddress] = newCrowdFund;
//          CrowdFundGenerated(now ,msg.sender);
//          return true;   
//     }

// }