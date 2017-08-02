pragma solidity ^0.4.11;

contract Ownable {
    address public owner;
    event ChangeOwner(uint , address indexed _owner);

    function Ownable(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

    function transferOwnership (address _newOwner) onlyOwner {
       if(_newOwner != address(0)){
            owner = _newOwner;
            ChangeOwner(now , _newOwner);
       }else{
           throw;
       }
        
    }



}