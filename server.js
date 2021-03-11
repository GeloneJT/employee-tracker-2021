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
          "View departments",
          "View employees",
          "View role",
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
        case "View departments":
          viewDept();
          break;
        case "View employees":
          viewEmp();
          break;
        case "View role":
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
  connection.query(
    "SELECT * FROM department WHERE employeedb.department = ?",
    (err, res) => {
      console.table(res);
      runSearch();
    }
  );
}

function viewEmp() {
  connection.query("SELECT * FROM employee WHERE = ?", (err, res) => {
    console.table(res);
    runSearch();
  });
}

function viewRole() {
  connection.query("SELECT * FROM department WHERE = ?", (err, res) => {
    console.table([res]);
    runSearch();
  });
}

function addDept() {
  inquirer.prompt([
    {
      type: "",
      name: "",
      message: "",
    },
    {
      type: "",
      name: "",
      message: "",
    },
  ]).then;
}

function addEmp() {
  inquirer.prompt([
    {
      type: "",
      name: "",
      message: "",
    },
    {
      type: "",
      name: "",
      message: "",
    },
  ]).then;
}

function addRole() {
  inquirer.prompt([
    {
      type: "",
      name: "",
      message: "",
    },
    {
      type: "",
      name: "",
      message: "",
    },
  ]).then;
}

function updateEmp() {
  inquirer.prompt([
    {
      type: "",
      name: "",
      message: "",
    },
    {
      type: "",
      name: "",
      message: "",
    },
  ]).then;
}

function exit() {
  connection.end();
}

runSearch();
