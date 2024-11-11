// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    await hre.run("compile");

    const ToDo = await hre.ethers.getContractFactory("ToDo");
    const todo = await ToDo.deploy();

    console.log("ToDo contract deployed to:", await todo.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
