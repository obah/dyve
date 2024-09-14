import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AcademyModule = buildModule("Academy", (m) => {
  const academy = m.contract("Academy", []);

  return { academy };
});

export default AcademyModule;

// Academy#Academy - 0x2D6524f95c9Be9Aa9FdD89f860D93165F92C23B0

// https://blockscout.lisk.com/address/0x2D6524f95c9Be9Aa9FdD89f860D93165F92C23B0#code