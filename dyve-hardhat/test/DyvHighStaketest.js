const {time, loadFixtures} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("MyTest", () => {
  async function globalObjectsNeeded() {
    const [owners, other] = await ethers.getSigners();

    ethers.getContractFactory()
  }
})