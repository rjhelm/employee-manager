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
    addEmployee: (departmentList, roleArray, managerArray) => [
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
        }
    ],
    addDepartment: {

    },
    addRole: (departmentChoices) => [
        {

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