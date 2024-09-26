
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MicroLoan {

    uint256 public borrowersInterestRate;
    uint256 public providersYieldRate;
    uint256 private nextBorrowerId = 1; 
    uint256 private nextLoanGiverId = 1;
    uint256 public maxBorrowAmount;
    uint256 public minReserve = 10_000 * 10**2; // 10,000 tokens the minimum reserve in the pool

    address public owner;
    address public USDT;
    address public mockUSDT;
    address public dyveToken;

    struct LoanProvider {
        address providerAddress;
        uint256 amountProvided;
        uint256 timeProvided;
        uint256 amountWithdrawn;
        uint256 yieldAccrued;
    }

    struct LoanPool{
        uint256 poolBalance;
        uint256 interestRate;
        uint256 totalCollaeralLocked;
        uint256 numberOfLoanProviders;
    }

    struct Borrower {
        uint256 borrowerId;
        address borrowerAddress;
        uint256 amountBorrowed;
        uint256 collateralAmount;
        uint256 timeBorrowed;
        uint256 paybackTime;
        uint256 ltvRatio;
        uint256 amountRepaid;
    }

    mapping(address => uint256) public LoanAccountUSDTBalances;
    mapping(address => uint256) public LoanAccountDyveBalances;

    mapping(address => LoanProvider) public providers;
    mapping(uint256 => LoanProvider) public numberOfProviders; 
    mapping(uint256 => Borrower) public borrowers;
    mapping(address => uint256) public providerBalance;
    mapping(uint256 => uint256) public borrowerBalance;
    mapping(address => uint256[]) public borrowerIds;
    mapping(address => bool) public hasBorrowed;


    event Deposit(address indexed provider, uint256 indexed amount, address indexed tokenType, uint256 timestamp);
    event Transfer(address indexed DyvLowStake, uint256 indexed amount, uint256 indexed timestamp);

    event LoanSupplied(address indexed provider, uint256 indexed amount, address indexed choice,  uint256 timestamp);
    event CollateralDeposited(uint256 indexed borrowerId, address indexed borrower, uint256 collateralAmount, uint256 timestamp);
    event LoanBorrowed(uint256 indexed borrowerId, address indexed borrower, uint256 amount, uint256 collateralAmount, uint256 paybackTime, uint256 timestamp);
    event YieldCalculated(address indexed provider, uint256 indexed yieldAmount, uint256 indexed timestamp);
    event YieldWithdrawn(address indexed provider, uint256 totalAmount, uint256 yieldWithdrawn, uint256 timestamp);
    event LoanRepaid(uint256 indexed borrowerId, address indexed borrower, uint256 amountRepaid, uint256 remainingBalance, uint256 timestamp);
    event LoanLiquidated(uint256 indexed borrowerId, address indexed borrower, uint256 collateralAmount, uint256 loanAmount, uint256 timestamp);
    event LoanWithdrawn(address indexed provider, uint256 indexed amountWithdrawn, address indexed tokenAddress, uint256 timestamp);
    event BorrowersInterestRateSet(uint256 indexed newRate, uint256 indexed timestamp);
    event ProvidersYieldRateSet(uint256 indexed newRate, uint256 indexed timestamp);
    event MaxBorrowAmountSet(uint256 indexed newAmount, uint256 indexed timestamp);


    modifier onlyOwner() {
        require(owner == msg.sender, "Unauthorized user");
        _;
    }

    constructor(address _dyveToken, address _USDT, uint256 _minReserve) {
        owner = msg.sender;
        dyveToken = _dyveToken;
        USDT = _USDT;
        minReserve = _minReserve;
    }

    enum TokenChoice {dyveToken, USDT }


    function depositToLoan(uint256 amount, TokenChoice _choice) external {
        address tokenAddress;
        
      
        if (_choice == TokenChoice.dyveToken) {
            tokenAddress = dyveToken;
            LoanAccountDyveBalances[msg.sender] += amount;
        } 
        
        else if (_choice == TokenChoice.USDT) {
            tokenAddress = USDT;
            LoanAccountUSDTBalances[msg.sender] += amount;
        }

        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        emit Deposit(msg.sender, amount, tokenAddress, block.timestamp);
    }



function withdrawFromLoan(uint256 amount, TokenChoice _choice) external {
    address tokenAddress;
  
    if (_choice == TokenChoice.dyveToken) {
        require(LoanAccountDyveBalances[msg.sender] >= amount, "Insufficient Dyve token balance");
        LoanAccountDyveBalances[msg.sender] -= amount; 
        tokenAddress = dyveToken;
    } 
    
    else if (_choice == TokenChoice.USDT) {
        require(LoanAccountUSDTBalances[msg.sender] >= amount, "Insufficient USDT balance");
        LoanAccountUSDTBalances[msg.sender] -= amount; 
        tokenAddress = USDT;
    }

    IERC20 token = IERC20(tokenAddress);
    require(token.balanceOf(address(this)) >= amount, "Contract has insufficient balance");
    require(token.transfer(msg.sender, amount), "Transfer failed");

    emit LoanWithdrawn(msg.sender, amount, tokenAddress, block.timestamp);
}



    function supplyLoanPool(uint256 amount, TokenChoice _choice) external {
        address tokenAddress;


        if (_choice == TokenChoice.dyveToken) {
            require(LoanAccountDyveBalances[msg.sender] >= amount, "Insufficient Dyve balance");
            LoanAccountDyveBalances[msg.sender] -= amount;
            tokenAddress = dyveToken;
        } 
        
        else if (_choice == TokenChoice.USDT) {
            require(LoanAccountUSDTBalances[msg.sender] >= amount, "Insufficient USDT balance");
            LoanAccountUSDTBalances[msg.sender] -= amount;
            tokenAddress = USDT;
        }

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(msg.sender) >= amount, "Insufficient wallet balance");

        uint256 loanGiverId = nextLoanGiverId++;
        providers[msg.sender] = LoanProvider({
            providerAddress: msg.sender,
            amountProvided: amount,
            timeProvided: block.timestamp,
            amountWithdrawn: 0,
            yieldAccrued: 0
        });

        numberOfProviders[loanGiverId] = providers[msg.sender];
        providerBalance[msg.sender] += amount;

        emit LoanSupplied(msg.sender, amount, tokenAddress, block.timestamp);
    }




    function depositCollateral() internal {
        
        uint256[] memory borrowerIdsList = borrowerIds[msg.sender];
        require(borrowerIdsList.length > 0, "No active loans found");

        // A borrower can only have one active loan at a time
        uint256 borrowerId = borrowerIdsList[0];
        Borrower storage borrower = borrowers[borrowerId];

        // Calculate required collateral as 150% of the borrower's balance
        uint256 amountBorrowed = borrower.amountBorrowed;
        uint256 collateralAmount = (amountBorrowed * 150) / 100; // 150% of the loan amount

        require(collateralAmount > 0, "Collateral must be greater than 0");
        require(borrower.collateralAmount == 0, "Collateral already deposited");

        IERC20 token = IERC20(dyveToken);

        require(token.transferFrom(msg.sender, address(this), collateralAmount), "Transfer failed");

        borrower.collateralAmount = collateralAmount;

        emit CollateralDeposited(borrowerId, msg.sender, collateralAmount, block.timestamp);
    }


function requestLoan(uint256 amount, uint256 paybackTime) external {
    IERC20 token = IERC20(mockUSDT);

    uint256 collateralAmount = (amount * 150) / 100; // 150% of the loan amount

    require(token.balanceOf(address(this)) - amount >= minReserve, "Not enough liquidity");
    require(collateralAmount > 0, "Collateral must be greater than 0");
    require(amount <= maxBorrowAmount, "Amount exceeds borrowing limit");

    // Check if the borrower has an active loan
    uint256[] memory borrowerIdsList = borrowerIds[msg.sender];
    
    if (borrowerIdsList.length == 0 || borrowers[borrowerIdsList[0]].collateralAmount == 0) {
        // If user has no active loan or no collateral, calls the depositCollateral function
        depositCollateral();
    }

    // Proceed with loan request after collateral has been deposited
    uint256 borrowerId = nextBorrowerId++;
    
    borrowers[borrowerId] = Borrower({
        borrowerId: borrowerId,
        borrowerAddress: msg.sender,
        amountBorrowed: amount,
        collateralAmount: collateralAmount,
        timeBorrowed: block.timestamp,
        paybackTime: paybackTime,
        ltvRatio: (collateralAmount * 100) / amount,
        amountRepaid: 0
    });

    borrowerBalance[borrowerId] += amount;
    borrowerIds[msg.sender].push(borrowerId);
    hasBorrowed[msg.sender] = true;

    require(token.transfer(msg.sender, amount), "Transfer failed");

    emit LoanBorrowed(borrowerId, msg.sender, amount, collateralAmount, paybackTime, block.timestamp);
}



    function calculateYield(LoanProvider storage provider) internal returns (uint256) {
        uint256 timeElapsed = block.timestamp - provider.timeProvided;
        uint256 yield = (provider.amountProvided * providersYieldRate * timeElapsed) / (365 days * 100);

        emit YieldCalculated(provider.providerAddress, yield, block.timestamp);

        return yield;
    }

    function distributeYield() external {
        for (uint256 i = 1; i < nextLoanGiverId; i++) {
            LoanProvider storage provider = numberOfProviders[i];
            uint256 yield = calculateYield(provider);
            provider.yieldAccrued += yield;
            provider.timeProvided = block.timestamp; 
        }
    }

    function payLoan() external {
        // Retrieve borrower IDs for msg.sender
        uint256[] memory borrowerIdsList = borrowerIds[msg.sender];
        require(borrowerIdsList.length > 0, "No active loans found");

        // Assumption::: borrower can have only one active loan
        uint256 borrowerId = borrowerIdsList[0];
        Borrower memory borrower = borrowers[borrowerId];

        require(borrower.borrowerAddress == msg.sender, "Not the borrower");

        uint256 outstandingAmount = borrower.amountBorrowed - borrower.amountRepaid;

        require(outstandingAmount > 0, "No outstanding balance");

        IERC20 token = IERC20(mockUSDT);
        require(token.transferFrom(msg.sender, address(this), outstandingAmount), "Transfer failed");

        borrower.amountRepaid += outstandingAmount;
        borrowerBalance[borrowerId] -= outstandingAmount;

        if (borrowerBalance[borrowerId] == 0) {

            uint256 collateralToRefund = borrower.collateralAmount;

            require(token.transfer(msg.sender, collateralToRefund), "Transfer failed");

            borrower.collateralAmount = 0;
            hasBorrowed[msg.sender] = false;
        }

        emit LoanRepaid(borrowerId, msg.sender, outstandingAmount, borrowerBalance[borrowerId], block.timestamp);
    }


    function liquidateCollateral() external {

        address borrowerAddress = msg.sender;
        uint256[] memory borrowerIdsList = borrowerIds[borrowerAddress];

        require(borrowerIdsList.length > 0, "No active loans found");

        uint256 borrowerId = borrowerIdsList[0];
        Borrower memory borrower = borrowers[borrowerId];

        require(block.timestamp > borrower.paybackTime, "Loan is not overdue yet");
        require(borrower.amountBorrowed > 0, "No loan to liquidate");

        IERC20 token = IERC20(dyveToken);
        uint256 collateralToTransfer = borrower.collateralAmount;

        require(token.transfer(owner, collateralToTransfer), "Transfer to liquidity pool failed"); 

        uint256 penaltyPercentage = 10; 
        uint256 amountToPayPool = borrower.amountBorrowed + (borrower.amountBorrowed * penaltyPercentage / 100);

        require(token.balanceOf(address(this)) >= amountToPayPool, "Not enough liquidity to cover penalty");

        // Initiates Transfer loan amount + penalty to the liquidity pool
        require(token.transfer(owner, amountToPayPool), "Transfer to liquidity pool failed");

        // On complete loan payment, borrower's record is reset
        borrower.amountBorrowed = 0;
        borrower.collateralAmount = 0;
        borrower.amountRepaid = 0;

        hasBorrowed[borrower.borrowerAddress] = false;

         emit LoanLiquidated(borrowerId, borrowerAddress, collateralToTransfer, amountToPayPool, block.timestamp);
    }

    // Loan provider withdraws from pool
    function withdrawProviderFunds() external {
        LoanProvider storage provider = providers[msg.sender];
        uint256 yieldToWithdraw = provider.yieldAccrued;

        uint256 totalAvailableToWithdraw = provider.amountProvided - provider.amountWithdrawn + yieldToWithdraw;
        require(totalAvailableToWithdraw > 0, "No funds available to withdraw");

        IERC20 token = IERC20(mockUSDT);
        require(token.balanceOf(address(this)) >= totalAvailableToWithdraw, "Insufficient contract balance");

        require(token.transfer(msg.sender, totalAvailableToWithdraw), "Transfer failed");

        provider.amountWithdrawn += (totalAvailableToWithdraw - yieldToWithdraw);
        provider.yieldAccrued = 0; 

        emit YieldWithdrawn(msg.sender, totalAvailableToWithdraw, yieldToWithdraw, block.timestamp);
    }


    function setBorrowersInterest(uint256 rate) external onlyOwner {
        borrowersInterestRate = rate;

        emit BorrowersInterestRateSet(borrowersInterestRate, block.timestamp);

    }

    function setLoanProvidersYield(uint256 rate) external onlyOwner {
        providersYieldRate = rate;

        emit ProvidersYieldRateSet(providersYieldRate, block.timestamp);        

    }

    function setMaxBorrowAmount(uint256 amount) external onlyOwner {
        maxBorrowAmount = amount;

        emit MaxBorrowAmountSet(maxBorrowAmount, block.timestamp);

    }

    function getLoanPoolBalance() external view onlyOwner returns (uint256) {
        IERC20 token = IERC20(dyveToken);
        return token.balanceOf(address(this));
    }

    // implement loan pool status

}
