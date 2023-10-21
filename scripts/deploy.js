// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
//CREATING FUNCTIONS FOR CONSOLING VALUES
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt); //from ethers.utils formatEther is shifted to ethers.formatEthers in
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const messg = memo.messg;
    const from = memo.from;
    console.log(`At ${timestamp}, name ${name}, address ${from}, message ${messg}`);
  }

}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); // instance of contract created to communicate with comntract;

  await contract.waitForDeployment();// deployed at hardhat server;
  console.log("Address of contract:", await contract.getAddress());

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying Chai");
  consoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).buyChai("from1", "very nice tea", amount);
  await contract.connect(from2).buyChai("from2", "very nice chai", amount);
  await contract.connect(from3).buyChai("from3", "very nice chowmin", amount);

  console.log("After buying Chai");
  await consoleBalances(addresses);

  const memos = await contract.getMemo();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
