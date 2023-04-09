// Import and require mysql2
const mysql = require("mysql2/promise");

const inquirer = require("inquirer");
// Express middleware
const cTable = require("console.table");
// Connect to database
let db;
mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "The_Soft_Kitten",
})
  .then(connection => {
    db = connection;
  })

//I will write my routes here
const getDeptInfo = async function () {
  console.log('db', db)
  // const db = await mysql.createConnection({
  //   host: "127.0.0.1",

  //   user: "root",

  //   password: "root",
  //   database: "The_Soft_Kitten",
  // });
  try {
    const sql = "SELECT * FROM department";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const getRoleInfo = async function () {

  try {
    const sql = "SELECT * FROM role";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const getEmployeeInfo = async function () {

  try {
    const sql = "SELECT * FROM employee";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};



const addDept = async function (deptName) {


  try {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [deptName];
    const [rows, fields] = await db.query(sql, params);
    console.log('adding department...')
  } catch (err) {
    console.log(err);
  }
};

//needs a title, salary and departent id
const addRole = async function (roleName, salary, department) {

  try {
    const sql = `INSERT INTO Role (title, salary, department_id)
    VALUES (?,?,?) `;
    const params = [roleName, salary, department];
    const [rows, fields] = await db.query(sql, params);

  } catch (err) {
    console.log(err);
  }
};

const addEmployee = async function (managerId, roleId, lastName, firstName) {

  try {
    const sql = `INSERT INTO employee (manager_id,role_id,last_name,first_name)
    VALUES (?,?,?,?)`;
    const params = [managerId, roleId, lastName, firstName];
    const [rows, fields] = await db.query(sql, params);

  } catch {
    console.log(err);
  }
}


const updateEmployee = async function (employee_id, role_id) {

  try {
    const sql = `UPDATE employee SET role_id=? WHERE id=?`;
    const params = [role_id, employee_id];
    const [rows, fields] = await db.query(sql, params);

  } catch (err) {
    console.log(err);
  }
};


//Inquirer prompts/functions
async function firstQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "Choices",
        message: "What would you like to do? ",
        choices: [
          { name: "View all departments", value: "viewDepartments" },
          { name: "View all roles", value: "viewRoles" },
          { name: "View all employees", value: "viewEmployees" },
          { name: "Add a department", value: "addDepartment" },
          { name: "Add a role", value: "addRole" },
          { name: "Add an employee", value: "addEmployee" },
          { name: "Update a employee", value: "updateEmployee" },
          { name: "exit", value: "quit" }

        ],
      },



    ])
    .then(async (answers) => {
      switch (answers.Choices) {
        case "viewDepartments":
          console.log("fetching departments...");
          await getDeptInfo();
          firstQuestion();
          break;
        case "viewRoles":
          console.log("fetching roles...");
          await getRoleInfo();
          firstQuestion();
          break;
        case "viewEmployees":
          console.log("fetching employees...");
          await getEmployeeInfo();
          firstQuestion();
          break;
        case "addDepartment":
          console.log("Adding department....");
          inquirer.prompt([{
            type: "input",
            name: "deptName",
            message: "What is the department name? ",
          }])
            .then(async (answers) => {
              // Get the dpetName answer that the user typed in
              const deptName = answers.deptName
              await addDept(deptName);
              console.log('asking first question again..')
              firstQuestion();
            })
          break;

        case "addRole":
          console.log("Adding role....");
          // WE NEED TO SHOW them a list of departments to choose from 
          var sql = "SELECT name, id AS value FROM department";
          var [rows, fields] = await db.query(sql);
          console.log('rows', rows);
          inquirer.prompt([
            {
              type: "input",
              name: "roleName",
              message: "What is the role name? ",
            },
            {
              type: "number",
              name: "salary",
              message: "What is their salary?"
            },

            {
              type: "list",
              name: "department",
              message: "choose department!",
              choices: rows
            },

          ])
            .then(async (answers) => {
              // Get all the answers that the user inputted
              const { roleName, salary, department } = answers

              await addRole(roleName, salary, department);
              console.log('asking first question again..')
              firstQuestion();
            })
          break;
        case "updateEmployee":
          var sql = "SELECT CONCAT(first_name,' ',last_name) as name, id as value FROM employee";
          var [employeerows, fields] = await db.query(sql);
          var sql = "SELECT title AS name, id AS value FROM role";
          var [rolerows, fields] = await db.query(sql);
          console.log('rows', rolerows);
          inquirer.prompt([

            {
              type: "list",
              name: "employee_id",
              message: "choose employee!",
              choices: employeerows
            },
            {
              type: "list",
              name: "role_id",
              message: "choose new role!",
              choices: rolerows
            },

          ])
            .then(async (answers) => {
              // Get all the answers that the user inputted
              const { employee_id, role_id } = answers

              await updateEmployee(employee_id, role_id);
              console.log('asking first question again..')
              firstQuestion();
            })
          break;
        case "addEmployee":
          console.log("Adding employee....");
          var sql = "SELECT CONCAT(first_name,' ',last_name) as name, id as value FROM employee";
          var [employeerows, fields] = await db.query(sql);

          var sql = "SELECT title AS name, id AS value FROM role";
          var [rolerows, fields] = await db.query(sql);

          console.log('rows', rows);
          inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is their first name? ",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is their last name?"
            },

            {
              type: "list",
              name: "roleId",
              message: "choose role!",
              choices: rolerows
            },
            {
              type: "list",
              name: "managerId",
              message: "who is the manager?",
              choices: employeerows
            },
          ])
            .then(async (answers) => {
              // Get all the answers that the user inputted
              const { managerId, roleId, lastName, firstName } = answers

              await addEmployee(managerId, roleId, lastName, firstName);
              console.log('asking first question again..')
              firstQuestion();
            })
          break;

        case "quit":
          process.exit(0);
          break;
        default:
          console.log("invalid option");
          firstQuestion();
      }



    });


}

firstQuestion();
