pragma solidity ^0.4.11;

import './Token.sol';
import './lib/safeMath.sol';


contract CrowdFund{
    

    using SafeMath for uint256;

    address public founderAddress;
    address public tokenAddress;
    address public multisigWallet;
    
    uint256 public startDate;
    uint256 public endDate;
    uint256 public minimumFundingGoal;
    uint256 public weiRaised = 0;    
    uint256 public investorCount = 0;
    uint256 public tokensSold = 0;
    uint256 public refundedAmount = 0;
    uint64 public tokenRate ;
    
    bool public finalized = false;
    
    Token public token;  
 
    mapping (address => uint256) public investedAmountRecord;
    mapping (address => uint256) public tokenAmountRecord;
    
    enum State{PreFunding, Funding, Success, Failure, Finalized, Refunding}
    
    event Invested(address indexed _investor, uint256 _weiAmount, uint256 _tokenAmount);
    
    modifier inState(State state) {
        if(getState() != state) 
        revert();
        _;
    }

    modifier nonZeroEth(){
        require(msg.value != 0);
        _;
    }

    modifier onlyFounders(){
        require(msg.sender == founderAddress);
        _;
    }

    function CrowdFund(address _founderAddress , uint256 _startDate , uint256 _endDate ,address _tokenAddress , uint64 _tokenConversionRate, uint256 _minimumFundingGoal ){
        
        founderAddress = _founderAddress;
        tokenRate = _tokenConversionRate;
        tokenAddress = _tokenAddress;
        
        token = Token(_tokenAddress);

        if(_startDate != 0 && _endDate != 0 && _endDate >= _startDate && _minimumFundingGoal != 0) {
            startDate = _startDate;
            endDate = _endDate;
            minimumFundingGoal = _minimumFundingGoal * 1 ether;
        }
    }    
    
    function isCrowdsaleFull() public constant returns(bool){
        if(sha3(tokensSold) == sha3(token.tokenAllocatedToCrowdFund()))
        return true;
        else
        return false;
    }
    
    function makeInvestment(address receiver) nonZeroEth payable public{
    
        if(getState() == State.Funding) {
            if(isMinimumGoalReached()){
                fundTransfer(msg.value);
            }
            uint weiAmount = msg.value;
            uint tokenAmount = msg.value.div(tokenRate);
            weiRaised = weiRaised.add(weiAmount);
            if(investedAmountRecord[receiver] == 0) {
            investorCount++;
            }
            if(token.transfer(receiver,tokenAmount)){
                tokensSold = tokensSold.add(tokenAmount);
                investedAmountRecord[receiver] = investedAmountRecord[receiver].add(weiAmount);
                tokenAmountRecord[receiver] = tokenAmountRecord[receiver].add(tokenAmount);
                Invested(receiver, weiAmount, tokenAmount);
            }
         }else {
            revert();
        }

    }

    
    function fundTransfer(uint256 _value) internal {
        founderAddress.transfer(_value);
    }

    function transferMinimumGoalFund() inState(State.Success) onlyFounders{
        founderAddress.transfer(this.balance);
    } 
    
    function finalize() public inState(State.Success) {
        if(finalized) {
        revert();
        }
        finalized = true;
    }


    function refundAmount() inState(State.Failure) public payable {
        if(msg.value == 0) 
            revert();
        refundedAmount = refundedAmount.add(msg.value);
    }

    function isMinimumGoalReached() public constant returns(bool) {
        return weiRaised >= minimumFundingGoal;
    }

    
    function getState() public constant returns(State) {
        if(finalized) 
        return State.Finalized;
        else if (block.timestamp < startDate) 
        return State.PreFunding;
        else if (block.timestamp <= endDate && !isCrowdsaleFull()) 
        return State.Funding;
        else if (isMinimumGoalReached()) 
        return State.Success;
        else if (!isMinimumGoalReached() && weiRaised > 0 && refundedAmount >= weiRaised) 
        return State.Refunding;
        else 
        return State.Failure;
    }

    function getBalance()internal returns(uint) {
        return token.balanceOf(this);
    }

    function() payable {
        makeInvestment(msg.sender);
    }

}
