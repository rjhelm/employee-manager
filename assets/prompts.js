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
            name: 'managerView',
            message: 'Select a manager:',
            choices: managerChoices,
        },
    ],
    departmentPromp: (departmentChoices) => [
        {
            type: 'list',
            name : 'departmentView',
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
            name: 'roleDepartment',
            message: 'Please select the department for the new role:',
            choices: departmentChoices
        }
    ],
    // Update //
    updateRole: (employees, job) => [
        {
            
        }
    ],
    updateManager: (employees) => [

    ],
    // Remove //
    removeEmployee: (removeEmployeeChoices) => [

    ],
    removeDepartment: (removeDepartmentChoices) => [

    ],
    removeRole: (removeRoleChoices) => [

    ]
};