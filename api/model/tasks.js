const { contract } = require('../contracts/contract')

const dateclashCheck = async (taskDate) => {
    const tasks = await contract.allTask();
    const foundTask = tasks.find(task => task.date === taskDate);

    if (foundTask) {
        return foundTask.name;
    }
    return "No Task Found";
}

const priorityCheck = async (id) => {
    const tasks = await contract.allTask();
    const result = tasks[id - 1].name.includes("priority")
    return result;
}
module.exports = { dateclashCheck, priorityCheck }