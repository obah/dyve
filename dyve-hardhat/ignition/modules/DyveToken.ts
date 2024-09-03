import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DyveTokenModule = buildModule("DyveToken", (m) => {
  const dyveToken = m.contract("DyveToken", []);

  return { dyveToken };
});

export default DyveTokenModule;
