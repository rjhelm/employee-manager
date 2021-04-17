const inquirer = require('inquirer');
const table = require('console.table');
const connect = require('./assets/db');
const prompt = require('./assets/prompts');
const figlet = require('figlet');
const { addNewEmployee, addNewDepartment, updateRole, updateManager } = require('./assets/prompts');
const connection = require('./assets/db');
require('console.table');

// App banner when loaded in the console
figlet('Employee Manager!', (err, data) => {
    if (err) {
        console.log('Something went wrong..');
        console.dir(err);
        return;
    }
    console.log(data)
});

// Launch the app in command line for user
initialPrompt();

// Start the app and begin inquirer prompts
initialPrompt = () => {
    inquirer.prompt(prompt.initialPrompt)
    .then(({ task }) => {
        switch(task) {
            case "View Employees":
                    vieweEmployee();
                    break;
            case "View Managers":
                    viewManager();
                    break;
            case "View Employees by Department":
                    viewEmployeeDepartment();
                    break;
            case "View Departments":
                    viewDepartment();
                    break;
            case "View Roles":
                    viewRoles();
                    break;
            case "View Department Budget":
                    viewBudget();
                    break;
            case "'Add Employee'":
                    addEmployee();
                    break;
            case "Add Department":
                    addDepartment();
                    break;
            case "Add Role":
                    addRole();
                    break;
            case "Update an Employees Role":
                    updateRole();
                    break;
            case "Update an Employees Manager":
                    updateManager();
                    break;
            case "Remove Employee":
                    removeEmployee();
                    break;
            case "Remove Department":
                    removeDepartment();
                    break;
            case "Remove Role":
                    removeRole();
                    break;
            case "Exit":
                console.log('Thank you for using Employee Manager!');
                connection.end();
                break;
        }
    });
}


