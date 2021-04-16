const inquirer = require('inquirer');
const table = require('console.table');
const connect = require('./assets/db');
const prompt = require('./assets/prompts');
const figlet = require('figlet');
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
        }
    })
}


