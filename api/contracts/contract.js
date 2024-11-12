const { ethers } = require("ethers");
const toDoContract = require("../artifacts/contracts/todo.sol/ToDo.json");

const abi = toDoContract.abi;
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.TODO_CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, abi, wallet);

module.exports = { contract };
