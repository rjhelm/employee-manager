const inquirer = require('inquirer');
const table = require('console.table');
const connect = require('./assets/connect.js');
const prompt = require('./assets/prompts');
const figlet = require('figlet');
const chalk = require('chalk');
const connection = require('./assets/db');


// Banner to start on app load //
connection.connect((error) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.greenBright.bold('Created By: Ryan Helm'));
    console.log(``);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();
  });

// Start the app and begin inquirer prompts
const promptUser = () => {
    inquirer.prompt(prompt.promptUser)
    .then(({ task }) => {
        switch(task) {
            case "View All Employees":
                    viewAllEmployee();
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
viewAllEmployee = () => {
    let sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS departmentm r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`
    connection.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(`                                                         ` + chalk.blueBright.bold(`ALL Employees`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.table(res);
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
}
    // View all roles //
const viewRoles = () => {
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(`                                                         ` + chalk.blueBright.bold(`ALL Roles`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.table(res);
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    promptUser();
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

                                    promptUser();
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
                                                            promptUser();
                                                        });
                                                    }));
                            });
                        });
}

// View companies departments //
viewDepartments = () => {
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
            res.forEach((department) => {
                console.log(`ID: ${department.id} | ${department.name} Department`);
            });
        figlet('DEPARTMENT', (err, res) => {
            if (err) throw err;
            console.log(err || res);
        });
        console.log(err);
        promptUser();
        });
}

