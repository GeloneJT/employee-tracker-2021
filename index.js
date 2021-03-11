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
          "View role(s)",
          "Add a department",
          "Add an employee",
          "Add role(s)",
          "Update employee role(s)",
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
        case "View role(s)":
          viewRole();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add role(s)":
          addRole();
          break;
        case "Update employee role(s)":
          updateEmp();
          break;
        case "Exit":
          updateEmp();
          break;
      }
    });
}
