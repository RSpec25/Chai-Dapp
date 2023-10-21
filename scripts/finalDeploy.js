const hre = require("hardhat");

async function main() {
    const chai = await hre.ethers.getContractFactory("chai");
    const contract = await chai.deploy(); // instance of contract created to communicate with comntract;

    await contract.waitForDeployment();// deployed at hardhat server;
    console.log("Address of contract:", await contract.getAddress());

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
// 0xB075d75ca74cab39F57EaE47b6344b8b57Af4013- contract address