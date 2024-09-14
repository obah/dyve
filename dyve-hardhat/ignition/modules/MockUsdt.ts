import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockUsdtModule = buildModule("MockUsdt", (m) => {
  const mockUsdt = m.contract("MockUsdt", []);

  return { mockUsdt };
});

export default MockUsdtModule;

// MockUsdt#MockUsdt - 0x2913ba4D9d925BC05006F529eEcb96D0BAd9C6D3

https://blockscout.lisk.com/address/0x2913ba4D9d925BC05006F529eEcb96D0BAd9C6D3#code