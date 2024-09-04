const {time, loadFixtures} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("MyTest", () => {
  async function globalObjectsNeeded() {

    stakedTokenAddress ="0xe6B266d72d16a4C01F0415167De79797d3911421";
    const [owner, other] = await ethers.getSigners();

    const dyvHighStake = await ethers.getContractFactory("DyvHighStake");

    dyvHighStake.deploy(stakedTokenAddress);

    return {stakedTokenAddress, owner, dyvHighStake};
  }
})