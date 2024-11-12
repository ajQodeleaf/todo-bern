const { dateclashCheck, priorityCheck } = require('../model/tasks');
const { contract } = require('../contracts/contract');

const createTask = async (req, res) => {
    const { taskName, taskDate } = req.body;
    const task = await dateclashCheck(taskDate);

    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash: Task cannot be added" });
        } else {
            const transaction = await contract.createTask(taskName, taskDate);
            res.status(200).json({ status: 200, message: "Task successfully created on the blockchain", transaction });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error creating task" });
    }
};

const updateTask = async (req, res) => {
    const { taskId, taskDate, account } = req.body;
    const task = await dateclashCheck(taskDate);

    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash: Task cannot be updated" });
        } else {
            const transaction = await contract.updateTask(taskId, taskDate);
            res.status(200).json({ status: 200, message: "Task successfully updated on the blockchain", transaction });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error updating task" });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const isTrue = await priorityCheck(taskId);

        if (isTrue) {
            res.status(403).json({ status: 403, message: "Task cannot be deleted" });
        } else {
            const transaction = await contract.deleteTask(taskId);
            res.status(200).json({ status: 200, message: "Task successfully deleted on the blockchain", transaction });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error deleting task" });
    }
};

const viewTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await contract.viewTask(taskId);
        const { id, name, date } = task;
        const numId = Number(id);

        res.status(200).json({ status: 200, taskObj: { numId, name, date }, message: "Task exists" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 404, message: "Task does not exist" });
    }
};

const allTasks = async (req, res) => {
    try {
        const tasks = await contract.allTask();
        if (tasks.length === 0) {
            res.status(404).json({ status: 404, message: "Task list does not exist" });
        } else {
            const taskList = tasks.map(({ id, name, date }) => {
                const taskId = Number(id);
                return { taskId, name, date };
            });

            res.status(200).json({ status: 200, taskList, message: "Tasks exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error retrieving tasks" });
    }
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
};
