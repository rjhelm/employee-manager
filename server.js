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
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.blueBright.bold('Created By: Ryan Helm'));
    console.log(``);
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    promptUser();
  });

// Start the app and begin inquirer prompts
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do? Select an option:',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'View All Employees By Department',
                'View All Employees by Manager',
                'View Department Budgets',
                'Update Employee Role',
                'Update Employee Manager',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Remove Employee',
                'Remove Role',
                'Remove Department',
                'Exit'
            ]
        }
    ]).then((answers) => {
        const {choices} = answers;

        if (choices === 'View All Employees') {
            viewEmployees();
        }
        if (choices === 'View All Roles') {
            viewRoles();
        }
        if (choices === 'View All Departments') {
            viewDepartments();
        }
        if (choices === 'View Employees By Department') {
            employeeByDepartment();
        }
        if (choices === 'View Employees By Manager') {
            employeeByManager();
        }
        if (choices === 'View Department Budget') {
            viewBudget();
        }
    })
}

// Functions for viewing information //
    // View all employees //
const viewEmployees = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department role.salary, 
    FROM employee, role, department
    WHERE department id = role.department_id
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`;
    connection.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
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
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(`                                                         ` + chalk.blueBright.bold(`ALL Roles`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    let sql = 'SELECT * FROM role';
    connection.promise().query(sql, (err, res) => {
        if(err) throw err;
        res.forEach((role) => {
			console.log(
				`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,
			);
		});
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
    
}

    // View all departments //
const viewDepartments = () => {
   
    const sql = 'SELECT * FROM departments';
    connection.promise().query(sql, (err, res) => {
        if(err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(`                       ` + chalk.blueBright.bold(`All Departments:`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.table(res);
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
        
}

    // View employees based on department //
const employeeByDepartment = () => {
    const sql = `SELECT employee.first_name,
                employee.last_name,
                department.department_name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role_id
                LEFT JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(`                       ` + chalk.blueBright.bold(`Employees by Department:`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.table(res);
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
}



    // View Employees based on manager //
const employeeByManager = () => {
    const sql = `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id GROUP BY e.manager_id`;

    connection.query(sql, (err, res) => {
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
                             let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
                                FROM employee 
                                JOIN role 
                                ON employee.role_id = role.id
                                JOIN department 
                                ON department.id = role.department_id
                                LEFT JOIN employee 
                                ON manager.id = employee.manager_id
                                WHERE manager.id = ?`;

                                connection.query(sql,(err, res) => {
                                    if (err) throw err;
                                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                                    console.log(`                       ` + chalk.blueBright.bold(`Employees by Manager:`));
                                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                                    console.table(res);
                                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                                    promptUser();
                                });
                            });
                        });
}

    // View department budget //
const viewBudget = () => {
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(`                       ` + chalk.blueBright.bold(`Department Budgets:`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    const sql = `SELECT department_id AS id,
    department.department_name AS department,
    SUM(salary) AS budget
    FROM role
    INNER JOIN department ON role.department_id = department.id GROUP BY role.department_id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();   
    });
}