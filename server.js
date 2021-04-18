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
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
                'Update Employee Manager',
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
        if (choices === 'Add Employee') {
            newEmployee();
        }
        if (choices === 'Add Role') {
            newRole();
        }
        if (choices === 'Add Department') {
            newDepartment();
        }
    });
}

// FUNCTIONS FOR VIEWING INFORMATION //

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
                            .prompt(prompt.viewManager(managerChoice))
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

    // FUNCTIONS FOR ADDING INFORMATION //
const newEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the employees first name:',
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Employee must have a first name, try again');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the employees last name:',
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('Employee must have a last name, try again');
                    return false;
                }
            }
        }
    ]).then(answer => {
        const fullName = [answer.firstName, answer.lastName]
        const addRole = `SELECT role.id, role.title FROM role`;
        connection.promise().query(addRole, (err, data) => {
            if (err) throw err;
            const roles = data.map(({ id, title })=> ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select the employees role:',
                    choices: roles
                }
            ]).then(roleChoice => {
                const role = roleChoice.role;
                fullName.push(role);
                const addManager = `SELECT * FROM employee`;
                connection.promise().query(addManager, (err, data) => {
                    if (err) throw err;
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' '+ last_name, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Please select the employees manager:',
                            choices: managers
                        }
                    ]).then(managerChoice => {
                        const manager = managerChoice.manager;
                        fullName.push(manager);
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?,?,?,?)`;
                        connection.query(sql, (err, res) => {
                            if (err) throw err;
                            console.log('This employee has been added to the database!');
                            viewEmployees();
                        });
                    });
                });
            });
        });
    });
}

    // Add a new job role //
const newRole = () => {
    const sql = `SELECT * FROM department`
    connection.promise().query(sql, (err, res) => {
        if (err) throw err;
        let departmentArray = [];
        res.forEach((department) => {departmentArray.push(department.department_name);});
         departmentArray.push('Add Department');
         inquirer.prompt([
             {
                 name: 'departmentName',
                 type: 'list',
                 message: 'Please select a department for this role:',
                 choices: departmentArray
             }
         ]).then((answer) => {
             if (answer.departmentName === 'Add Department') {
                 this.newDepartment();
             } else {
                 continueRole(answer);
             }
         });
         const continueRole = (departmentData) => {
             inquirer.prompt([
                 {
                    name: 'createRole',
                    type: 'input',
                    message: 'Please enter the name of this role:',
                 },
                 {
                     name: 'salary',
                     type: 'input',
                     message: 'Please enter the salary for this role:',
                 }
             ]).then((answer) => {
                 let userRole = answer.createRole;
                 let departmentId;
                 response.forEach((department) => {
                     if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
                 });

                 let sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
                 let roleData = [userRole, answer.salary, departmentId];
                 connection.promise().query(sql, roleData, (err) => {
                     if (err) throw err;
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     console.log(chalk.grey.bold('Your role was created succesfully!'));
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     viewRoles();
                 });
             });
         }
    });
}