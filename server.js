const inquirer = require('inquirer');
const table = require('console.table');
const connection = require('./config/connection.js');
const figlet = require('figlet');
const chalk = require('chalk');
const validate = require('./config/validate');
// const { registerPrompt } = require('inquirer');


// Banner to start on app load //
connection.connect((err) => {
    if (err) throw err;
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Manager')));
    console.log(``);
    console.log(`                                      ` + chalk.blueBright.bold('Created By: Ryan Helm'));
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
            message: 'Select an option:',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'View All Employees By Department',
                // 'View All Employees by Manager',
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
            allEmployees();
        }
        if (choices === 'View All Roles') {
            viewRoles();
        }
        if (choices === 'View All Departments') {
            viewDepartments();
        }
        // if (choices === 'View Employees By Department') {
        //     employees
        //     employeesByDepartment();
        // }
        // if (choices === 'View Department Budget') {
        //     viewBudget();
        // }
        if (choices === 'Add Employee') {
            newEmployee();
        }
        if (choices === 'Add Role') {
            newRole();
        }
        if (choices === 'Add Department') {
            newDepartment();
        }
        if (choices === 'Update Employee Role') {
            updateRole();
        }
        if (choices === 'Update Employee Manager') {
            updateManager();
        }
        if (choices === 'Remove Employee') {
            deleteEmployee();
        }
        if (choices === 'Remove Role') {
            deleteRole();
        }
        if (choices === 'Remove Department') {
            deleteDepartment();
        }
        if (choices === 'Exit') {
            connection.end();
        }
    });
}

// FUNCTIONS FOR VIEWING INFORMATION //

    // View all employees //
    const allEmployees = () => {
        let sql = `SELECT employee.id, 
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.department_name AS 'department', 
                  role.salary
                  FROM employee, role, department 
                  WHERE department.id = role.department_id 
                  AND role.id = employee.role_id
                  ORDER BY employee.id ASC`;
        connection.query(sql, (err, res) => {
          if (err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.log(`                                          ` + chalk.blueBright.bold(`ALL Employees`));
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.table(res);
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
}
    // View all roles //
const viewRoles = () => {
    console.log(chalk.greenBright.bold(`=====================================================================================================`));
    console.log(chalk.redBright.bold(`=====================================================================================================`));
    console.log(`                                                    ` + chalk.blueBright.bold(`ALL Roles`));
    console.log(chalk.redBright.bold(`=====================================================================================================`));
    let sql = 'SELECT * FROM role';
    connection.query(sql, (err, res) => {
        if(err) throw err;
        res.forEach((role) => {
			console.log(
				`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,
			);
		});
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
    
}

    // View all departments //
const viewDepartments = () => {
   
    let sql = 'SELECT * FROM department';
    connection.query(sql, (err, res) => {
        if(err) throw err;
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.log(`                       ` + chalk.blueBright.bold(`All Departments:`));
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.table(res);
        console.log(chalk.redBright.bold(`=====================================================================================================`));
        console.log(chalk.greenBright.bold(`=====================================================================================================`));
        promptUser();
    });
        
};

    // View employees based on department //
    // const employeesByDepartment = () => {
    //     let  sql =  `SELECT employee.first_name, 
    //                 employee.last_name, 
    //                 department.department_name AS department
    //                 FROM employee 
    //                 LEFT JOIN role ON employee.role_id = role.id 
    //                 LEFT JOIN department ON role.department_id = department.id`;
    //     connection.query(sql, (err, res) => {
    //       if (err) throw err;
    //         console.log(chalk.greenBright.bold(`=====================================================================================================`));
    //         console.log(chalk.redBright.bold(`=====================================================================================================`));
    //         console.log(`                              ` + chalk.blueBright.bold(`Employees by Department:`));
    //         console.log(chalk.redBright.bold(`=====================================================================================================`));
    //         console.table(res);
    //         console.log(chalk.redBright.bold(`=====================================================================================================`));
    //         console.log(chalk.greenBright.bold(`=====================================================================================================`));
    //         promptUser();
    //       });
    //   };


    // View Budgets for Departments //
// const viewBudget = () => {
//     console.log(chalk.greenBright.bold(`=====================================================================================================`));
//             console.log(chalk.redBright.bold(`=====================================================================================================`));
//             console.log(`                              ` + chalk.blueBright.bold(`Department Budget:`));
//     let sql =     `SELECT department_id AS id, 
//                     department.department_name AS department,
//                     SUM(salary) AS budget
//                     FROM  role  
//                     INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
//     connection.query(sql, (err, res) => {
//       if (err) throw err;
//       console.log(chalk.redBright.bold(`=====================================================================================================`));
//       console.table(res);
//       console.log(chalk.redBright.bold(`=====================================================================================================`));
//       console.log(chalk.greenBright.bold(`=====================================================================================================`));
//       promptUser();
//     });
//   };

    // FUNCTIONS FOR ADDING INFORMATION //
    // Add a new employee //
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
        let fullName = [answer.firstName, answer.lastName]
        let addRole = `SELECT role.id, role.title FROM role`;
        connection.query(addRole, (err, data) => {
            if (err) throw err;
            let roles = data.map(({ id, title })=> ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select the employees role:',
                    choices: roles
                }
            ]).then(roleChoice => {
                let role = roleChoice.role;
                fullName.push(role);
                let addManager = `SELECT * FROM employee`;
                connection.query(addManager, (err, data) => {
                    if (err) throw err;
                    let managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' '+ last_name, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Please select the employees manager:',
                            choices: managers
                        }
                    ]).then(managerChoice => {
                        let manager = managerChoice.manager;
                        fullName.push(manager);
                        const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                  VALUES (?, ?, ?, ?)`;
                        connection.query(sql, fullName, (err) => {
                            if (err) throw err;
                            console.log('This employee has been added to the database!');
                            allEmployees();
                        });
                    });
                });
            });
        });
    });
}

    // Add a new job role //
const newRole = () => {
    let sql = `SELECT * FROM department`
    connection.query(sql, (err, res) => {
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
                 res.forEach((department) => {
                     if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
                 });

                 let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                 let roleData = [userRole, answer.salary, departmentId];
                 connection.query(sql, roleData, (err) => {
                     if (err) throw err;
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     console.log(chalk.redBright.bold(`=====================================================================================================`));
                     console.log(chalk.grey.bold('Your role was created succesfully!'));
                     console.log(chalk.redBright.bold(`=====================================================================================================`));
                     console.log(chalk.greenBright.bold(`=====================================================================================================`));
                     viewRoles();
                 });
             });
         }
    });
}

    // Add a new department //
const newDepartment = () => {
    inquirer.prompt([
        {
            name: 'createDepartment',
            type: 'input',
            message: 'Please enter the name of the new department:',
        }
    ]).then((answer) => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.createDepartment, (err, res) => {
            if (err) throw err;
            console.log(chalk.greenBright.bold(`=====================================================================================================`));
            console.log(chalk.redBright.bold(`=====================================================================================================`));
            console.log(chalk.gray.bold(answer.createDepartment + `  Department was created succesfully!`));
            console.log(chalk.redBright.bold(`=====================================================================================================`));
            console.log(chalk.greenBright.bold(`=====================================================================================================`));
            viewDepartments();
        });
    });
}

    // FUNCTIONS FOR UPDATING INFORMATION //
    // Update the role of an employee //
const updateRole = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role_id AS 'role_id'
                FROM employee, role, department
                WHERE department.id = role.department_id
                AND role.id = employee.role_id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        let employeeArray = [];
        res.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});
        let sql = `SELECT role.id, role.title FROM role`;
        connection.query(sql, (err, res) => {
            if (err) throw err;
            let roleArray = [];
            res.forEach((role) => {roleArray.push(role.title);});
            inquirer.prompt([
                {
                    name: 'selectEmployee',
                    type: 'list',
                    message: 'Please select the employee who has a new role:',
                    choices: employeeArray
                },
                {
                    name: 'selectRole',
                    type: 'list',
                    message: 'Please select the new role:',
                    choices: roleArray
                }
            ]).then((answer) => {
                let newRole, employeeId;
                res.forEach((role) => {
                    if (answer.selectRole === role.title) {
                        newRole = role.id;
                    }
                });
                res.forEach((employee) => {
                    if (answer.selectEmployee === `${employee.firest_name} ${employee.last_name}`) {
                        employeeId = employee.id;
                    }
                });
                let sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
                connection.query(sql, [newRole, employeeId], (err) => {
                    if (err) throw err;
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.gray.bold(`Your Employees Role was succesfully updated!`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    promptUser();
                });
            });
        });
    });
}

    // Update the manager of an employee //
const updateManager = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
                FROM employee`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        let employeeArray = [];
        res.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});
        inquirer.prompt([
            {
                name: 'selectEmployee',
                type: 'list',
                message: 'Please select the employee who has a new manager:',
                choices: employeeArray
            },
            {
                name: 'selectManager',
                type: 'list',
                message: 'Please select the new manager for this employee',
                choices: employeeArray
            }
        ]).then((answer) => {
            let employeeId, managerId;
            res.forEach((employee) => {
                if (answer.selectEmployee === (`${employee.first_name} ${employee.last_name}`)) {
                    employeeId = employee.id;
                }
                if (answer.selectManager === (`${employee.first_name} ${employee.last_name}`)) {
                    managerId = employee.id;
                }
            });
            if (validate.isSame(answer.selectEmployee, answer.selectManager)) {
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.redBright.bold(`The employee you chose is invalid, please try again!`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                promptUser();
            } else {
                let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
                connection.query(sql, [managerId, employeeId], (err) => {
                    if (err) throw err;
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.blueBright.bold(`This employees manager has been updated`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    promptUser();
                });
            }
        });
    });
}


    // FUNCTIONS TO REMOVE INFORMATION //
    // remove an employee //
const deleteEmployee = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        let employeeArray = [];
        res.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});
        inquirer.prompt([
            {
                name: 'selectEmployee',
                type: 'list',
                message: 'Please select the employee that you would like to remove:',
                choices: employeeArray
            }
        ]).then((answer) => {
            let employeeId;
            res.forEach((employee) => {
                if (answer.selectEmployee === `${employee.first_name} ${employee.last_name}`) {
                    employeeId = employee.id;
                }
            });
            let sql = `DELETE FROM employee WHERE employee.id = ?`;
            connection.query(sql, [employeeId], (err) => {
                if (err) throw err;
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.blueBright.bold(`Your emplpoyee was succesfully removed from the database`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                allEmployees();
            });
        });
    });
}

    // Delete a role //
    const deleteRole = () => {
        let sql = `SELECT role.id, role.title FROM role`;
        connection.query(sql, (err, res) => {
            if (err) throw err;
            let roleArray = [];
            res.forEach((role) => {roleArray.push(role.title);});
            inquirer.prompt([
                {
                    name: 'selectRole',
                    type: 'list',
                    message: 'Please select the role that you would like to remove:',
                    choices: roleArray
                }
            ]).then((answer) => {
                let roleId;
                res.forEach((role) => {
                if (answer.selectRole === role.title) {
                    roleId = role.id;
                }
            });
                let sql =   `DELETE FROM role WHERE role.id = ?`;
                connection.query(sql, [roleId], (err) => {
                    if (err) throw err;
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.blueBright.bold(`Your role has been removed from the database`));
                    console.log(chalk.redBright.bold(`=====================================================================================================`));
                    console.log(chalk.greenBright.bold(`=====================================================================================================`));
                    viewRoles();
                });
            });
        });
    }

    // Delete a department //
const deleteDepartment = () => {
    let sql = `SELECT department.id, department.department_name FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        let departmentArray = [];
        res.forEach((department) => {departmentArray.push(department.department_name);});
        inquirer.prompt([
            {
                name: 'selectDepartment',
                type: 'list',
                message: 'Please select the department you would like to remove:',
                choices: departmentArray
            }
        ]).then((answer) => {
   
        let departmentId;
        res.forEach((department) => {
            if (answer.selectDepartment === department.department_name) {
                departmentId = department.id;
            }
        });
            let sql = `DELETE FROM department WHERE department.id = ?`;
            connection.query(sql, [departmentId], (err) => {
                if (err) throw err;
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.blueBright.bold(`Your department has been removed from the database`));
                console.log(chalk.redBright.bold(`=====================================================================================================`));
                console.log(chalk.greenBright.bold(`=====================================================================================================`));
                viewDepartments();
            });
        });
    });
}
