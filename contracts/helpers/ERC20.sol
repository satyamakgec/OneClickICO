pragma solidity ^0.4.11;

contract ERC20 {
    uint256 public totalSupply;
    function balanceOf(address _who) constant returns (uint);
    function transfer(address _to , uint256 _value) returns (bool);
    function transferFrom(address _from , address _to , uint256 _value) returns (bool);
    function allowance(address _owner , address _spender ) constant returns (uint256);
    function approve(address _spender , uint256 _value) returns (bool);
    event Transfer(address indexed _from , address indexed _to , address _value);
    event Approval (address indexed _owner, address indexed _spender, uint256 _value);
}