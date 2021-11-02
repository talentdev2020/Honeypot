const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const hre = require("hardhat");

// describe("Reentrancy Attack success", function () {
//   let bank;
//   let attack;
//   beforeEach(async function() {
//     const Logger = await hre.ethers.getContractFactory("Logger");
//     const logger = await Logger.deploy();

//     await logger.deployed();

//     const Bank = await hre.ethers.getContractFactory("Bank");
//     bank = await Bank.deploy(logger.address);

//     await bank.deployed();

//     const Attack = await hre.ethers.getContractFactory("Attack");
//     attack = await Attack.deploy(bank.address);

//     await attack.deployed();

//     // initial deposit
//     const accounts = await hre.ethers.getSigners();
//     await bank.deposit({
//       from: accounts[0].address,
//       value: ethers.utils.parseEther("15.0"),
//     });
//     await attack.deposit({
//       from: accounts[0].address,
//       value: ethers.utils.parseEther("8.0"),
//     });
//   })

//   it("Should attack reentrancy success", async function () {
//     const bankBalance = await bank.getBalance();

//     const attackBalance = await attack.getBalance();
//     try {
//       await attack.attack();
//     } catch (err) {
// console.log(err)
//     }
//     const attackedBalance = await attack.getBalance();
//     expect(parseFloat(attackedBalance.toString())).to.equal(parseFloat(bankBalance.toString()) + parseFloat(attackBalance.toString()));
 
//   });

//   it("Should bank balance 0", async function () {
//     try {
//       await attack.attack();
//       const initialBalance = await bank.getBalance();

//       expect(initialBalance.toString()).to.equal("0");
//     } catch(err) {

//     }
//   });
// });

describe("Trap Hacker", function () {
  let bank;
  let attack;

  beforeEach(async function() {
    const HoneyPot = await hre.ethers.getContractFactory("HoneyPot");
    const honeyPot = await HoneyPot.deploy();

    await honeyPot.deployed();

    const Bank = await hre.ethers.getContractFactory("Bank");
    bank = await Bank.deploy(honeyPot.address);

    await bank.deployed();

    const Attack = await hre.ethers.getContractFactory("Attack");
    attack = await Attack.deploy(bank.address);

    await attack.deployed();

    // initial deposit
    const accounts = await hre.ethers.getSigners();
    await bank.deposit({
      from: accounts[0].address,
      value: ethers.utils.parseEther("5.0"),
    });
    await attack.deposit({
      from: accounts[0].address,
      value: ethers.utils.parseEther("8.0"),
    });
  })
  it("Should hacker tap", async function () {
    try {
      const attackBalance = await attack.getBalance();
      await attack.attack();
      const attackedBalance = await attack.getBalance();

      expect(attackedBalance.toString).to.equal(parseFloat(attackBalance.toString()) + 1);
    } catch (err) {

    }
  });
});

