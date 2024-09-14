import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MicroLoanModule = buildModule("MicroLoanModule", (m) => {

  const minReserve = 10_000 * 10**2; // 10,000 tokens (10% of the minimum profit in the platform)

  const MockUSDTAddress = "0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C";

  const microLoan = m.contract("MicroLoan", [MockUSDTAddress, minReserve]);

  return { microLoan };
});

export default MicroLoanModule;

// MicroLoanModule#MicroLoan - 0xC7D3CBF0DAcd588269A887bC14A6339221B8b20a

// https://blockscout.lisk.com/address/0xC7D3CBF0DAcd588269A887bC14A6339221B8b20a#code