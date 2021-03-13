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

function viewDept() {
  const query = `SELECT * FROM department ORDER BY id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewEmp() {
  const query = `SELECT * FROM employee ORDER BY id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewRole() {
  const query = `SELECT * FROM role ORDER BY department_id DESC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

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
          type: "input",
          name: "addEmpRole",
          message: "What is the employee's ID number?",
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
      });
    // runSearch();
  });
}

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
      });
  });
}

function updateEmp() {
  inquirer.prompt([
    {
      type: "list",
      name: "updateMan",
      message: "Which employee's manager would you like to update?",
      choices: [],
    },
    {
      type: "list",
      name: "upddateEmpMan",
      message:
        "Which employee do you want to select as manager for selected employee?",
      choices: [],
    },
  ]).then;
  runSearch();
}

function exit() {
  connection.end();
}

runSearch();
