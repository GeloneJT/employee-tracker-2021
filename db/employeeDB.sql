DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT, 
    name VARCHAR(30)  UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    INDEX dep_id (department_id),
    title VARCHAR(30) NOT NULL,
    salary INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee (
    id INT UNIQUE AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    FOREIGN KEY (role_id) REFERENCES employee(manager_id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX man_id (manager_id),
    FOREIGN KEY (manager_id) REFERENCES role(department_id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);
