const inquirer = require('inquirer');
const table = require('console.table');
const connect = require('./assets/connect.js');
const prompt = require('./assets/prompts');
const figlet = require('figlet');
const { addNewEmployee, addNewDepartment, updateRole, updateManager, start, managerPrompt, departmentPrompt } = require('./assets/prompts');
const connection = require('./assets/db');
require('console.table');

// App banner when loaded in the console
figlet('Employee Manager', (err, data) => {
    if (err) {
        console.log('Something went wrong..');
        console.dir(err);
        return;
    }
    console.log(data)
});


start();

// Start the app and begin inquirer prompts
start = () => {
    inquirer.prompt(prompt.start)
    .then(({ task }) => {
        switch(task) {
            case "View Employees":
                    viewEmployee();
                    break;
            case "View Managers":
                   viewManager();
                    break;
            case "View Employees by Department":
                    employeeByDepartment();
                    break;
            case "View Departments":
                    viewDepartments();
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

// Functions for viewing information //
    // View all employees //
viewEmployee = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS departmentm r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                        FROM employee e
                        LEFT JOIN role r
                        ON e.role_id = r.id
                        LEFT JOIN department d
                        ON d.id = r.department_id
                        LEFT JOIN employee m
                        ON m.id = e.manager_id`, (err, res) => {
                            if (err) throw err;
                            figlet("EMPLOYEES:", (err, res) => {
                                console.table(res);
                                console.log(err);

                                start();
                            });

                        });
}

    // View Employees based on manager //
viewManager = () => {
    connection.query(`SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
                        ON e.role_id = r.id
                        LEFT JOIN department d
                        ON d.id = r.department_id
                        LEFT JOIN employee m
                        ON m.id = e.manager_id GROUP BY e.manager_id`, (err, res) => {
                            if (err) throw err;
                            const managerChoices = res
                            .filter((mgr) => mgr.manager_id)
                            .map(({ manager_id, manager }) => ({
                                value: manager_id,
                                name: manager,
                            }));
                            inquirer
                            .prompt(prompt.viewManager(managerChoices))
                            .then((answer) => {
                                connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
                                FROM employee e
                                JOIN role r
                                ON e.role_id = r.id
                                JOIN department d
                                ON d.id = r.department_id
                                LEFT JOIN employee m
                                ON m.id = e.manager_id
                                WHERE m.id = ?`,(err, res) => {
                                    if (err) throw err;
                                    console.table("Employees who are directly benath this manager:", res);
                                    console.log(err);

                                    start();
                                });
                            });
                        });
}

// View employees based on department //
employeeByDepartment = () => {

    connection.query(`SELECT d.id, d.name
                        FROM employee e
                        LEFT JOIN role r
                        ON e.role_id = r.id
                        LEFT JOIN department d
                        ON d.id = r.department_id
                        GROUP BY d.id, d.name`, (err, res) => {
                            if (err) throw err;
                            const departmentChoices = res.map((data) => ({
                                value: data.id,
                                name: data.name,
                            }));
                            inquirer
                            .prompt(prompt.employeeByDepartment(departmentChoices))
                            .then((answer) => {
                                connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                                                    FROM employee e
                                                    JOIN role r
                                                    ON e.role_id = r.id
                                                    JOIN department d
                                                    ON d.id = r.department_id
                                                    WHERE d.id = ?` ((err, res) => {
                                                        if (err) throw err;
                                                        figlet('View Employees By Department', (err, res) => {
                                                            console.log(err || res);
                                                            console.table(res);
                                                            start();
                                                        });
                                                    }));
                            });
                        });
}

