const fs = require("fs");
const filepath = "./todo.json";

const loadtasks = () => {
    try {
        const databuffer = fs.readFileSync(filepath);
        const data = databuffer.toString();
        return JSON.parse(data);
    } catch (error) {
        return []; // If file doesn't exist, return an empty array
    }
};

const savetasks = (tasks) => {
    const datajson = JSON.stringify(tasks);
    fs.writeFileSync(filepath, datajson);
};

const list = () => {
    const tasks = loadtasks();
    tasks.forEach((task, index) => console.log(`${index + 1}. ${task.task}`));
};

const add = (task) => {
    const tasks = loadtasks();
    tasks.push({ task });
    savetasks(tasks);
    console.log("Task added:", task);
};

// Get command-line arguments
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    add(argument);
} else if (command === "list") {
    list();
} else {
    console.log("Invalid command! Use 'add' or 'list'.");
}
