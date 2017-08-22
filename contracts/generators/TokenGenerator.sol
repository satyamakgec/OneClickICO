pragma solidity ^0.4.11;

import '../Token.sol';
import '../data/DataStore.sol';


contract TokenGenerator {

    Token newToken; 
    DataStore dataStore;
    address dataStoreAddress;

    event PlatformAddressChange(uint _blockTimestamp, address _newAddress);
    event TokenGenerated(uint _blockTimeStamp , address _owner , uint256 _intialSupply , bytes32 _symbol , bytes32 _tokenName);

    modifier onlyPlatform(address _sender){
        require(dataStore.platform() == _sender);
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


    function TokenGenerator(address _dataStoreAddress){
       dataStoreAddress = _dataStoreAddress;
       dataStore = DataStore(dataStoreAddress);
    }

    // function changePlatformAddress(address _newPlatformAddress) onlyPlatform(_newPlatformAddress) nonZerAddress(_newPlatformAddress){
    //     platform = _newPlatformAddress;
    //     PlatformAddressChange(now , platform);
    // }

    function generateNewToken(uint256 _initialSupply , uint256 _decimal , bytes32 _tokenName , bytes32 _tokenSymbol )  returns (bool){
         newToken  = new Token(_initialSupply , _decimal , _tokenName , _tokenSymbol);
         dataStore.pushToTokenCreators(msg.sender,newToken);
         TokenGenerated(now , msg.sender , _initialSupply , _tokenSymbol , _tokenName );
         return true;   
    }
     
    function getCrowdFundAddress(address _tokenAddr) constant returns(address){
        return dataStore.getCrowdFundAddress(_tokenAddr);
    } 
    
    function getLengthOfTokenCreators(address _creator) constant returns(uint256){
       return  dataStore.getTokenCreatorsLength(_creator); 
    }
    
    function gettokenAddress(address _creator, uint8 index) constant returns(address){
        return dataStore.gettokenAddress(_creator,index);
    }
  
}
