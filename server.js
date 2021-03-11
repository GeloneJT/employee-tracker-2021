const mysql = require("mysql");
const console = require("console");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
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
  connection.query("SELECT * FROM department ORDER BY id DESC", (err, res) => {
    console.table([res]);
    runSearch();
  });
}

function viewEmp() {
  connection.query("SELECT * FROM employee ORDER BY role_id DESC", (err, res) => {
    console.table([res]);
    runSearch();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role ORDER BY department_id DESC", (err, res) => {
    console.table([res]);
    runSearch();
  });
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "addNewDept",
      message: "What is the name of the new department?",
    },
  ]).then;
  runSearch();
}

function addEmp() {
  inquirer.prompt([
    {
      type: "input",
      name: "addFirst",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "addLast",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "addEmpRole",
      message: "What is the employee's role?",
      choices: [],
    },
    {
      type: "list",
      name: "addEmpMan",
      message: "Who is the employee's manager?",
      choices: [],
    },
  ]).then;
  runSearch();
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "addTitle",
      message: "What is the title of the postion?",
    },
    {
      type: "number",
      name: "addSalary",
      message: "What is the starting salary for the new position?",
    },
    {
      type: "number",
      name: "addDeptId",
      message: "What is the ID number for new role?",
    },
  ]).then;
  runSearch();
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
