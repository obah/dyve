import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DyvCardModule = buildModule("DyvCard", (m) => {
  const dyvCard = m.contract("DyvCard", []);

  return { dyvCard };
});

export default DyvCardModule;
