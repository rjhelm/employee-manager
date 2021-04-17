module.exports = {
    initialPrompt: {
        type: 'list',
        name: 'task',
        message: 'Choose a task:',
        choices: [
            // User options for viewing employees //
            'View Employees',
            'View Managers',
            'View Employees by Department',
            'View Departments',
            'View Roles',
            'View Budget',
            // User options for adding employees //
            'Add Employee',
            'Add Department',
            'Add Role',
            // User options for updating current information //
            'Update an Employees Role',
            'Update an Employees Manager',
            // Options for removing current information //
            'Remove Employee',
            'Remove Department',
            'Remove Role',
            'Exit'
        ],
    },
    // View //
    managerPrompt: (managerChoices) => [
        {
            type: 'list',
            name: 'managerId',
            message: 'Select a manager:',
            choices: managerChoices,
        },
    ],
    departmentPrompt: (departmentChoices) => [
        {
            type: 'list',
            name : 'departmentId',
            message: 'Select a department:',
            choices: departmentChoices,
        },
    ],
    // Add //
    addEmployee: (departmentList, roleList, managerList) => [
        {
            name: 'firstName',
            type: 'input',
            message: 'Please enter the employees first name:'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Please enter the employees last name:',
        },
        {
            name: 'department',
            type: 'list',
            message: 'Select the department for this employee',
            choices: departmentList,
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select the role for this employee:',
            choices: roleList,
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Select the manager for this employee:',
            choices: managerList,
        },
    ],
    addDepartment: {
        name: 'department',
        type: 'input',
        message: 'Please enter the name of the new department:',
    },
    addRole: (departmentChoices) => [
        {
            type: 'input',
            name: 'nameRole',
            message: 'Please enter the name of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for the new role:',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Please select the department for the new role:',
            choices: departmentChoices
        }
    ],
    // Update //
    updateRole: (employees, jobTitle) => [
        {
            name: 'updateRole',
            type: 'list',
            message: 'Please select the employee for this role update:',
            choices: employees,
        },
        {
            name: 'title',
            type: 'list',
            message: 'Please select the new role for this employee:',
            choices: jobTitle,
        }
    ],
    updateManager: (employees) => [
        {
            name: 'update',
            type: 'list',
            message: 'Please select the employee for this manager update:',
            choices: employees,
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Please select the new manager for this employee:',
            choices: employees,
        },
    ],
    // Remove //
    removeEmployee: (removeEmployeeChoices) => [
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please select the employee that you would like to remove:',
            choices: removeEmployeeChoices,
        },
    ],
    removeDepartment: (removeDepartmentChoices) => [
        {
            type: 'list',
            name: 'departmentId',
            message: 'Please select the department that you would like to remove:',
            choices: removeDepartmentChoices,
        },
    ],
    removeRole: (removeRoleChoices) => [
        {
            type: 'list',
            name: 'roleId',
            message: 'Please select the role that you would like to remove:',
            choices: removeRoleChoices,
        },
    ],
};