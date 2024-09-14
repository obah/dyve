import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DyvCardModule = buildModule("DyvCard", (m) => {
  const dyvCard = m.contract("DyvCard", []);

  return { dyvCard };
});

export default DyvCardModule;

// DyvCard#DyvCard - 0x4512d630022bf306Af4810dc0533bbFB8368c733

// https://blockscout.lisk.com/address/0x4512d630022bf306Af4810dc0533bbFB8368c733