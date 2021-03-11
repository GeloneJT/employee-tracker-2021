DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT, 
    name VARCHAR(30)  UNIQUE NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE role (
    INDEX dep_id (department_id),
    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL
)

CREATE TABLE employee (
    id INT UNIQUE AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    --FOREIGN KEY REFERENCES, 
    manager_id INT UNSIGNED,
    INDEX man_id (manager_id),
    --FOREIGN KEY REFERENCES,
    PRIMARY KEY(id)
)
