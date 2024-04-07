#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let isCondition = true;
//print wellcome message
console.log(chalk.yellow.italic.bold("\n\n\t\t\t ----------------  Welcome To My Cli Todo List ---------------- \t\t"));
console.log(chalk.green("\t\t\t\t\t   -^-^-^-^-^-^-^-^-^-^-^-^-^-\t"));
console.log(chalk.green("\t\t\t\t\t   ---------------------------\t"));
async function todMain() {
    while (isCondition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo List", "Exit"],
                message: chalk.yellow("Select an option you want to do: ")
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            isCondition = false;
        }
    }
}
// Add Task Function to add the todo list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task: "
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.greenBright(`\n Task ${chalk.white.bold(newTask.task)} is added successfully in Todo List.`));
    console.log(todoList);
};
//function to view all Todo-List Tasks
let viewTask = () => {
    console.log(chalk.cyan.bold("\n Your Todo List: \n"));
    todoList.forEach((task, index) => {
        console.log(chalk.white(`${index + 1} : ${task}`));
    });
    console.log("\n");
};
//function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the Index No of the task you want to delete : "
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.red(`\n Task ${chalk.white(deletedTask)} has been deleted successfully from your todo list.`));
    console.log(todoList);
};
//function to update a task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the Index No of the task you want to update : "
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name :",
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log((`\n Task at index no. ${chalk.cyan.bold(update_task_index.index)} updated successfully.`));
    console.log(todoList);
};
todMain();
