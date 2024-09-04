import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const stakedTokenAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";

const DyvHighStakeModule = buildModule("DyvHighStakeModule", (m) => {
  const save = m.contract("DyvHighStake", [stakedTokenAddress]);

  return {save};
})

export default DyvHighStakeModule;