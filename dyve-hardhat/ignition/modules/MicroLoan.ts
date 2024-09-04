import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MicroLoanModule = buildModule("MicroLoanModule", (m) => {

  const minReserve = 10_000 * 10**18; // 10,000 tokens (10% of the minimum profit in the platform)

  const MockUSDTAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";

  const microLoan = m.contract("MicroLoan", [MockUSDTAddress, minReserve]);

  return { microLoan };
});

export default MicroLoanModule;
