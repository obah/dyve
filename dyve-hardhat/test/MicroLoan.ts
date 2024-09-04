import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";


describe("MicroLoan Contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMicroLoanFixture() {
    const [owner, provider, borrower] = await hre.ethers.getSigners();

    const _tokenAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";
    
    const Token = await hre.ethers.getContractFactory("ERC20Mock"); // Assuming ERC20Mock is a mock ERC20 token
    const token = await Token.deploy("Test Token", "TTK", hre.ethers.parseUnits("1000000", 18));
    
    const MicroLoan = await hre.ethers.getContractFactory("MicroLoan");
    const microLoan = await MicroLoan.deploy(_tokenAddress, hre.ethers.parseUnits("10000", 18));
    
    return { microLoan, token, owner, provider, borrower };
  }

  describe("Deployment", function () {
    it("Should set the right token address", async function () {
      const { microLoan, owner, token } = await loadFixture(deployMicroLoanFixture);

      const _tokenAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";

      expect(await microLoan.tokenAddress()).to.equal(_tokenAddress);
    });

    it("Should set the right owner", async function () {
      const { microLoan, owner } = await loadFixture(deployMicroLoanFixture);
      expect(await microLoan.owner()).to.equal(owner.address);
    });
  });

  describe("Loan Supply", function () {
    it("Should allow providers to supply loans", async function () {
      const { microLoan, token, provider } = await loadFixture(deployMicroLoanFixture);
      
      const amount = hre.ethers.parseUnits("1000", 18);
      await token.connect(provider).approve(microLoan.address, amount);
      await microLoan.connect(provider).supplyLoanPool(amount);
      
      const providerData = await microLoan.providers(provider.address);
      expect(providerData.amountProvided).to.equal(amount);
    });

    it("Should revert if transfer fails", async function () {
      const { microLoan, provider } = await loadFixture(deployMicroLoanFixture);
      await expect(microLoan.connect(provider).supplyLoanPool(hre.ethers.parseUnits("1000", 18)))
        .to.be.revertedWith("Transfer failed");
    });
  });

  describe("Borrowing and Collateral", function () {
    it("Should allow borrowing and require collateral", async function () {
      const { microLoan, token, borrower } = await loadFixture(deployMicroLoanFixture);

      const borrowAmount = hre.ethers.parseUnits("500", 18);
      const collateralAmount = (borrowAmount.mul(75)).div(100);
      
      await token.connect(borrower).approve(microLoan.address, collateralAmount);
      await microLoan.connect(borrower).depositCollateral();
      
      await token.connect(borrower).approve(microLoan.address, borrowAmount);
      await microLoan.connect(borrower).borrow(borrowAmount, (await time.latest()) + 30 * 24 * 60 * 60); // 30 days later
      
      const borrowerData = await microLoan.borrowers(1);
      expect(borrowerData.amountBorrowed).to.equal(borrowAmount);
      expect(borrowerData.collateralAmount).to.equal(collateralAmount);
    });

    it("Should revert if collateral deposit fails", async function () {
      const { microLoan, borrower } = await loadFixture(deployMicroLoanFixture);
      await expect(microLoan.connect(borrower).depositCollateral())
        .to.be.revertedWith("Collateral must be greater than 0");
    });
  });

  describe("Repayment and Liquidation", function () {
    it("Should allow repayment and refund collateral", async function () {
      const { microLoan, token, borrower } = await loadFixture(deployMicroLoanFixture);

      const borrowAmount = hre.ethers.parseUnits("500", 18);
      const collateralAmount = (borrowAmount * 75 * 100);

      await token.connect(borrower).approve(microLoan.address, collateralAmount);
      await microLoan.connect(borrower).depositCollateral();
      
      await token.connect(borrower).approve(microLoan.address, borrowAmount);
      await microLoan.connect(borrower).borrow(borrowAmount, (await time.latest()) + 30 * 24 * 60 * 60); // 30 days later

      await time.increaseTo((await time.latest()) + 30 * 24 * 60 * 60); // Move time to after the loan period
      
      await token.connect(borrower).approve(microLoan.address, borrowAmount);
      await microLoan.connect(borrower).payLoan();

      const borrowerData = await microLoan.borrowers(1);
      expect(borrowerData.collateralAmount).to.equal(0);
    });

    it("Should allow liquidation if loan is overdue", async function () {
      const { microLoan, token, borrower } = await loadFixture(deployMicroLoanFixture);

      const borrowAmount = hre.ethers.parseUnits("500", 18);
      const collateralAmount = (borrowAmount.mul(75)).div(100);

      await token.connect(borrower).approve(microLoan.address, collateralAmount);
      await microLoan.connect(borrower).depositCollateral();
      
      await token.connect(borrower).approve(microLoan.address, borrowAmount);
      await microLoan.connect(borrower).borrow(borrowAmount, (await time.latest()) - 1); // Past date
      
      await expect(microLoan.connect(borrower).liquidateCollateral())
        .to.be.revertedWith("No loan to liquidate");
    });
  });

  describe("Yield Distribution", function () {
    it("Should distribute yield correctly", async function () {
      const { microLoan, token, provider } = await loadFixture(deployMicroLoanFixture);
      
      const amount = hre.ethers.parseUnits("1000", 18);
      await token.connect(provider).approve(microLoan.address, amount);
      await microLoan.connect(provider).supplyLoanPool(amount);
      
      await time.increase(365 * 24 * 60 * 60); // 1 year
      await microLoan.connect(provider).distributeYield();
      
      const providerData = await microLoan.providers(provider.address);
      expect(providerData.yieldAccrued).to.be.gt(0);
    });
  });

  describe("Provider Withdrawals", function () {
    it("Should allow providers to withdraw funds", async function () {
      const { microLoan, token, provider } = await loadFixture(deployMicroLoanFixture);
      
      const amount = hre.ethers.parseUnits("1000", 18);
      await token.connect(provider).approve(microLoan.address, amount);
      await microLoan.connect(provider).supplyLoanPool(amount);

      // Simulate yield accumulation
      await time.increase(365 * 24 * 60 * 60); // 1 year
      await microLoan.connect(provider).distributeYield();
      
      await microLoan.connect(provider).withdrawProviderFunds();
      
      const providerData = await microLoan.providers(provider.address);
      expect(providerData.amountWithdrawn).to.be.gt(0);
    });
  });
});


