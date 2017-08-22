pragma solidity ^0.4.11;

contract DataStore {
    
    address public platform ;
    mapping (address => address ) public CrowdFundCreators;
    mapping (address => address[]) public tokenCreators;
    
    
    function DataSore() {
        platform = msg.sender;
    }
    function pushToCrowdFundCreators(address _tokenAddress,address _crowdfundAddress) {
        CrowdFundCreators[_tokenAddress] = _crowdfundAddress;
    }
    function pushToTokenCreators(address _creator,address _newTokenAddress) {
        tokenCreators[_creator].push(_newTokenAddress);
    }
    function getCrowdFundAddress(address _tokenAddress) returns(address) {
        return CrowdFundCreators[_tokenAddress];
    }
    function getTokenCreatorsLength(address Addr)returns(uint256) {
        return tokenCreators[Addr].length;
    }
    function gettokenAddress(address _creator,uint8 index) returns(address) {
        return tokenCreators[_creator][index];
    }
}
