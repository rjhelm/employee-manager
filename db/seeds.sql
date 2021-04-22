USE employees;

/* employees data array */
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 2), ('Jane', 'Doe', 1, null), ('Jackie', 'Robinson', 1, 2), ('Magic', 'Johnson', 2, 2), ('Rick', 'Sanchez', 4, null);

/* role data array */
INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 90000, 1), ("Senior Engineer", 125000, 1), ("Finacial Lead", 350000, 3), ("Senior Attorney", 200000, 4), ("Attorney", 150000, 4);



/* department array */
INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing"), ("Management");
