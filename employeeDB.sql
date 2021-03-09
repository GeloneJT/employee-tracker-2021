DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNASSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)  UNIQUE NOT NULL
)

CREATE TABLE role (
    department_id INT NOT NULL UNASSIGNED,
    INDEX dep_id (department_id),
    --Foreign key refrences cascasde
    title VARCHAR(30),
    salary INT NOT NULL UNASSIGNED
)

CREATE TABLE employee (
    id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL UNASSIGNED,
    INDEX role_id (role_id),
    --Foreign key refrences cascasde
    manager_id INT UNASSIGNED
    INDEX man_id (manager_id)
    --Foreign key refrences cascasde
)
