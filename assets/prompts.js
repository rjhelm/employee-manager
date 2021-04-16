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
            'Update Manager',
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

        },
    ],
    departmentPromp: (departmentChoices) => [
        {

        },
    ],
    // Add //
    addNewEmployee: (department, role, manager) => [
        {

        },
    ],
    addNewDepartment: {

    },
    addNewRole: (departmentChoices) => [
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
    deleteEmployee: (deleteEmployeeChoices) => [

    ],
    deleteDepartment: (deleteDepartmentChoices) => [

    ],
    deleteRole: (deleteRoleChoices) => [

    ]
};