pragma solidity ^0.4.11;

contract DataStore {
    address public platform ;
    // mapping (address => mapping ( address => address) ) public CrowdFundCreators;
    mapping (address => address[]) public tokenCreators;

    
}