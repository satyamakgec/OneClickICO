pragma solidity ^0.4.11;

import '../Token.sol';

contract TokenGenerator {

    Token newToken;    

    address public platform ;
    mapping (address => address) public tokenHolders;

    event PlatformAddressChange(uint _blockTimestamp, address _newAddress);
    event TokenGenerated(uint _blockTimeStamp , address indexed _owner , uint _intialSupply , string indexed _symbol , string indexed _tokenName);

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


    function TokenGenricHandler(){
        platform = msg.sender;
    }



    function changePlatformAddress(address _newPlatformAddress) onlyPlatform nonZeroAddress(_newPlatformAddress){
        platfrom = _newPlatformAddress;
        PlatformAddressChange(now , platform);
    }

    function generateNewToken(uint _initialSupply , uint8 _decimal , string _tokenName , string _tokenSymbol ) private notPlatform {
         newToken  = new Token(_startDate, _endDate, _intialSupply , _decimal , _tokenName , _tokenSymbol , msg.sender);
         tokenHolders[msg.sender] = newToken;
         TokenGenerated(now , msg.sender , _initialSupply , _tokenSymbol , _tokenName );   
    }



}