import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockUsdtModule = buildModule("MockUsdt", (m) => {
  const mockUsdt = m.contract("MockUsdt", []);

  return { mockUsdt };
});

export default MockUsdtModule;
