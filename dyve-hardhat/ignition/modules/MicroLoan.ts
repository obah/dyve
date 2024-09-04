import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const MicroLoanModule = buildModule("MicroLoanModule", (m) => {
  const minReserve = ethers.parseUnits("10000", 2);

  const MockUSDTAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";

  const microLoan = m.contract("MicroLoan", [MockUSDTAddress, minReserve]);

  return { microLoan };
});

export default MicroLoanModule;
