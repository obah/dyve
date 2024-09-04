// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "./interfaces/IERC20.sol";

contract MicroLoan {

    uint256 public borrowersInterestRate;
    uint256 public providersYieldRate;
    uint256 private nextBorrowerId = 1; 
    uint256 private nextLoanGiverId = 1;
    uint256 public maxBorrowAmount;
    uint256 minReserve = 10_000 * 10**18; // 10,000 tokens 

    address public tokenAddress;
    address public owner;
    address public savingsContract;

    struct LoanProvider {
        address providerAddress;
        uint256 amountProvided;
        uint256 timeProvided;
        uint256 amountWithdrawn;
        uint256 yieldAccrued;
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

    mapping(address => LoanProvider) public providers;
    mapping(uint256 => LoanProvider) public numberOfProviders; 
    mapping(uint256 => Borrower) public borrowers;
    mapping(address => uint256) public providerBalance;
    mapping(uint256 => uint256) public borrowerBalance;
    mapping(address => uint256[]) public borrowerIds;
    mapping(address => bool) public hasBorrowed;


    event DepositFromSavings(address indexed provider, uint256 indexed amount, uint256 indexed timestamp);
    event TransferToSavings(address indexed savingsContract, uint256 indexed amount, uint256 indexed timestamp);

    event LoanSupplied(address indexed provider, uint256 indexed amount, uint256 indexed timestamp);
    event CollateralDeposited(uint256 indexed borrowerId, address indexed borrower, uint256 collateralAmount, uint256 timestamp);
    event LoanBorrowed(uint256 indexed borrowerId, address indexed borrower, uint256 amount, uint256 collateralAmount, uint256 paybackTime, uint256 timestamp);
    event YieldCalculated(address indexed provider, uint256 indexed yieldAmount, uint256 indexed timestamp);
    event LoanRepaid(uint256 indexed borrowerId, address indexed borrower, uint256 amountRepaid, uint256 remainingBalance, uint256 timestamp);
    event LoanLiquidated(uint256 indexed borrowerId, address indexed borrower, uint256 collateralAmount, uint256 loanAmount, uint256 timestamp);
    event YieldWithdrawn(address indexed provider, uint256 indexed amountWithdrawn, uint256 indexed timestamp);
    event BorrowersInterestRateSet(uint256 indexed newRate, uint256 indexed timestamp);
    event ProvidersYieldRateSet(uint256 indexed newRate, uint256 indexed timestamp);
    event MaxBorrowAmountSet(uint256 indexed newAmount, uint256 indexed timestamp);


    modifier onlyOwner() {
        require(owner == msg.sender, "Unauthorized user");
        _;
    }

    constructor(address _tokenAddress, uint256 _minReserve) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        minReserve = _minReserve;
    }


    function depositFromSavings(uint256 amount) external {
        // Transfers tokens from the savings contract to the microloan contract
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        providerBalance[msg.sender] += amount;

        emit DepositFromSavings(msg.sender, amount, block.timestamp);
    }

    function transferToSavings(uint256 amount) external {
        // Transfers tokens from the microloan contract to the savings contract
        require(IERC20(tokenAddress).transfer(savingsContract, amount), "Transfer failed");

        providerBalance[msg.sender] -= amount;

        emit TransferToSavings(savingsContract, amount, block.timestamp);
    }


    function supplyLoanPool(uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);

        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

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

        emit LoanSupplied(msg.sender, amount, block.timestamp);
    }
    

    function depositCollateral() external {
        // Fetch the borrower's ID from the mapping
        uint256[] storage borrowerIdsList = borrowerIds[msg.sender];
        require(borrowerIdsList.length > 0, "No active loans found");

        // Assuming the borrower has only one active loan
        uint256 borrowerId = borrowerIdsList[0];
        Borrower storage borrower = borrowers[borrowerId];

        // Calculate required collateral as 75% of the borrower's outstanding balance
        uint256 amountBorrowed = borrower.amountBorrowed;
        uint256 collateralAmount = (amountBorrowed * 75) / 100; // 75% of the loan amount

        require(collateralAmount > 0, "Collateral must be greater than 0");
        require(borrower.collateralAmount == 0, "Collateral already deposited");

        // Transfer the calculated collateral amount from the borrower to the contract
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), collateralAmount), "Transfer failed");

        // Update borrower's collateral amount
        borrower.collateralAmount = collateralAmount;

        emit CollateralDeposited(borrowerId, msg.sender, collateralAmount, block.timestamp);
    }


    function borrow(uint256 amount, uint256 paybackTime) external {
        
        IERC20 token = IERC20(tokenAddress);

        uint256 collateralAmount = (amount * 75) / 100; // 75% of the loan amount

        require(token.balanceOf(address(this)) - amount >= minReserve, "Not enough liquidity");
        require(collateralAmount > 0, "Collateral must be greater than 0");
        require(amount <= maxBorrowAmount, "Amount exceeds borrowing limit");

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
        uint256[] storage borrowerIdsList = borrowerIds[msg.sender];
        require(borrowerIdsList.length > 0, "No active loans found");

        // Assuming borrower only has one active loan
        uint256 borrowerId = borrowerIdsList[0];
        Borrower storage borrower = borrowers[borrowerId];

        require(borrower.borrowerAddress == msg.sender, "Not the borrower");

        // Outstanding balance (amountBorrowed - amountRepaid)
        uint256 outstandingAmount = borrower.amountBorrowed - borrower.amountRepaid;

        require(outstandingAmount > 0, "No outstanding balance");

        // Transfer the payment amount from the borrower to the contract
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), outstandingAmount), "Transfer failed");

        // Update borrower’s repayment amount and balance
        borrower.amountRepaid += outstandingAmount;
        borrowerBalance[borrowerId] -= outstandingAmount;

        // Check if the loan is fully repaid
        if (borrowerBalance[borrowerId] == 0) {
            // Refund collateral
            uint256 collateralToRefund = borrower.collateralAmount;
            require(token.transfer(msg.sender, collateralToRefund), "Transfer failed");

            // Clear borrower record
            borrower.collateralAmount = 0;
            hasBorrowed[msg.sender] = false;
        }

        emit LoanRepaid(borrowerId, msg.sender, outstandingAmount, borrowerBalance[borrowerId], block.timestamp);
    }

    function liquidateCollateral() external {
        // Retrieve borrower IDs for the borrower address
        address borrowerAddress = msg.sender;
        uint256[] storage borrowerIdsList = borrowerIds[borrowerAddress];
        require(borrowerIdsList.length > 0, "No active loans found");

        // Assuming the borrower has only one active loan
        uint256 borrowerId = borrowerIdsList[0];
        Borrower storage borrower = borrowers[borrowerId];

        require(block.timestamp > borrower.paybackTime, "Loan is not overdue yet");
        require(borrower.amountBorrowed > 0, "No loan to liquidate");

        // Transfer collateral to the loan pool
        IERC20 token = IERC20(tokenAddress);
        uint256 collateralToTransfer = borrower.collateralAmount;

        require(token.transfer(owner, collateralToTransfer), "Transfer to liquidity pool failed"); // Changed to use `owner` address

        // Calculate amount to pay back into the pool including penalty
        uint256 penaltyPercentage = 10; 
        uint256 amountToPayPool = borrower.amountBorrowed + (borrower.amountBorrowed * penaltyPercentage / 100);

        // Check if enough funds are available in the contract
        require(token.balanceOf(address(this)) >= amountToPayPool, "Not enough liquidity to cover penalty");

        // Transfer loan amount + penalty to the liquidity pool
        require(token.transfer(owner, amountToPayPool), "Transfer to liquidity pool failed"); // Changed to use `owner` address

        // On complete loan payment, reset the borrower's record
        borrower.amountBorrowed = 0;
        borrower.collateralAmount = 0;
        borrower.amountRepaid = 0;

        hasBorrowed[borrower.borrowerAddress] = false;

         emit LoanLiquidated(borrowerId, borrowerAddress, collateralToTransfer, amountToPayPool, block.timestamp);
    }

    function withdrawProviderFunds() external {
        LoanProvider storage provider = providers[msg.sender];
        uint256 yieldToWithdraw = provider.yieldAccrued;

        uint256 amountToWithdraw = provider.amountProvided - provider.amountWithdrawn + yieldToWithdraw;
        require(amountToWithdraw > 0, "No funds to withdraw");

        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(msg.sender, amountToWithdraw), "Transfer failed");

        provider.amountWithdrawn += amountToWithdraw;
        provider.yieldAccrued = 0; 

        emit YieldWithdrawn(msg.sender, amountToWithdraw, block.timestamp);
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
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }
}
