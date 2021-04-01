const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "password",
  database: "employeeDB",
});
//Starts inquirer
function runSearch() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message:
          "What section of the employee databse would you like to search?",
        choices: [
          "View all departments",
          "View all employees",
          "View all role",
          "Add a department",
          "Add an employee",
          "Add role",
          "Update employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.userChoice) {
        case "View all departments":
          viewDept();
          break;
        case "View all employees":
          viewEmp();
          break;
        case "View all role":
          viewRole();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add an employee":
          addEmp();
          break;
        case "Add role":
          addRole();
          break;
        case "Update employee role":
          updateEmp();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}
//View all departments
function viewDept() {
  const query = `SELECT * FROM department ORDER BY id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
//View all employees
function viewEmp() {
  const query = `SELECT * FROM employee ORDER BY id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
//View all roles
function viewRole() {
  const query = `SELECT * FROM role ORDER BY department_id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
//Add a new department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addNewDept",
        message: "What is the name of the new department?",
        validate: (addDeptVal) => {
          if (addDeptVal) {
            return true;
          } else {
            console.log("Enter a department name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      let query = `INSERT INTO department(name) VALUES (?)`;
      connection.query(query, answer.addNewDept, (err, res) => {
        if (err) throw err;
        console.log(answer.addNewDept + ` department created!!!`);
        runSearch();
      });
    });
}
//Add a new employee
function addEmp() {
  connection.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "addFirst",
          message: "What is the employee's first name?",
          validate: (firstVal) => {
            if (firstVal) {
              return true;
            } else {
              console.log("Enter a name");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "addLast",
          message: "What is the employee's last name?",
          validate: (lastVal) => {
            if (lastVal) {
              return true;
            } else {
              console.log("Enter a name");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "addEmpRole",
          message: "What is the employee's title?",
          choices() {
            const choiceArrayAddEmpRole = [];
            results.forEach(({title}) => {
              choiceArrayAddEmpRole.push(title);
            });
            return choiceArrayAddEmpRole;
          }
        },
        {
          type: "input",
          name: "addEmpMan",
          message: "What is the employee's manager's ID?",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.addFirst,
            last_name: answer.addLast,
            role_id: answer.addEmpRole,
            manager_id: answer.addEmpMan,
          },
          console.log("Employee successfully created!!!")
        );
        runSearch();
      });
  });
}
//Add a new role
function addRole() {
  const query = `SELECT * FROM role ORDER BY department_id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "input",
          name: "addTitle",
          message: "What is the title of the postion?",
          validate: (addRoleVal) => {
            if (addRoleVal) {
              return true;
            } else {
              console.log("Enter a title");
              return false;
            }
          },
        },
        {
          type: "number",
          name: "addSalary",
          message: "What is the starting salary for the new position?",
        },
        {
          type: "number",
          name: "addDeptId",
          message: "What is the department ID for new role?",
          validate: (addDeptVal) => {
            if (addDeptVal) {
              return true;
            } else {
              console.log("Enter a role ID");
              return false;
            }
          },
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.addTitle,
            salary: answer.addSalary,
            department_id: answer.addDeptId,
          },
          console.log("Role successfully created!!!")
        );
        runSearch();
      });
  });
}
//Update employee
function updateEmp() {
  const choiceArrayEmp = [];
  const choiceArrayRole = [];
  connection.query(`SELECT employee.first_name, employee.last_name, employee.role_id, employee.id FROM employee`, (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmp",
          message: "Which employee would you like to update?",
          choices() {
            results.forEach((employee) => {
             
              choiceArrayEmp.push(
                `${employee.first_name} ${employee.last_name} id:${employee.id}`
              );
            });
            return choiceArrayEmp;
          },
        },
        {
          type: "list",
          name: "updateEmpRole",
          message: "What is the employees new role?",
          choices() {
            results.map(({role_id}) => {
              choiceArrayRole.push(role_id);
            });
            return choiceArrayRole;
          },
        },
      ])
      .then((answer) => {
        console.log(answer.updateEmp)
        console.log(answer.updateEmpRole)
        let employeeArr = answer.updateEmp.split("id:")
        let query = `UPDATE employee SET role_id = ${answer.updateEmpRole} WHERE id = ${employeeArr[1]}   `;
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log("Employee updated!!!");
          runSearch();
        });
      });
  });
}

function exit() {
  connection.end();
}

runSearch();
