import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AcademyModule = buildModule("Academy", (m) => {
  const academy = m.contract("Academy", []);

  return { academy };
});

export default AcademyModule;
