import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DyveTokenModule = buildModule("DyveToken", (m) => {
  const dyveToken = m.contract("DyveToken", []);

  return { dyveToken };
});

export default DyveTokenModule;


// DyveToken#DyveToken - 0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C

// https://blockscout.lisk.com/address/0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C#code