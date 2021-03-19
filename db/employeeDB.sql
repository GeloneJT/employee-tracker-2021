DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT, 
    name VARCHAR(30)  UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT  NOT NULL AUTO_INCREMENT,
    INDEX dep_id (department_id),
    title VARCHAR(30) NOT NULL,
    salary INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT UNSIGNED UNIQUE AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(department_id)  ON DELETE CASCADE,
    manager_id INT UNSIGNED NOT NULL,
    INDEX manager_id (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE CASCADE
);
