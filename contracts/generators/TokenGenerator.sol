pragma solidity ^0.4.11;

import '../Token.sol';
import '../data/DataStore.sol';

contract TokenGenerator is DataStore{

    Token newToken;    

    event PlatformAddressChange(uint _blockTimestamp, address _newAddress);
    event TokenGenerated(uint _blockTimeStamp , address indexed _owner , uint _intialSupply , bytes32 indexed _symbol , bytes32 indexed _tokenName);

    modifier onlyPlatform(address _sender){
        require(platform == _sender);
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


    function TokenGenricHandler(){
        platform = msg.sender;
    }

    function TokenGenerator(){
        platform = msg.sender;
    }

    function changePlatformAddress(address _newPlatformAddress) onlyPlatform(_newPlatformAddress) nonZerAddress(_newPlatformAddress){
        platform = _newPlatformAddress;
        PlatformAddressChange(now , platform);
    }

    function generateNewToken(uint256 _initialSupply , uint8 _decimal , bytes32 _tokenName , bytes32 _tokenSymbol )  notPlatform returns (bool){
         newToken  = new Token(_initialSupply , _decimal , _tokenName , _tokenSymbol);
         tokenCreators[msg.sender].push(newToken);
         TokenGenerated(now , msg.sender , _initialSupply , _tokenSymbol , _tokenName );
         return true;   
    }

   
}
