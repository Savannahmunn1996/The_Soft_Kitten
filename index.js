// Import and require mysql2
const mysql = require("mysql2/promise");

const inquirer = require("inquirer");
// Express middleware
const cTable = require("console.table");
// Connect to database

//I will write my routes here
const getDeptInfo = async function () {
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try {
    const sql = "SELECT * FROM department";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const getRoleInfo = async function () {
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try {
    const sql = "SELECT * FROM role";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const getEmployeeInfo = async function () {
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try {
    const sql = "SELECT * FROM employee";
    const [rows, fields] = await db.query(sql);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

//Post Routes

const addDept = async function () {
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [body.name];
    const [rows, fields] = await db.query(sql, params);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

//needs a title, salary and departent id
const addRole = async function () {
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try {
    const sql = `INSERT INTO Role (title, salary, department_id)
    VALUES (?)`;
    const params = [body.title, body.salary, body.department_id];
    const [rows, fields] = await db.query(sql, params);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const addEmployee = async function(){
  const db = await mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "root",
    database: "The_Soft_Kitten",
  });
  try{
    const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES (?)`;
    const params = [body.first_name, body.last_name, body.role_id,manager_id ];
    const [rows, fields] = await db.query(sql, params);
    console.table(rows);
  }catch{
    console.log(err);
  }
}


//Inquirer prompts/functions
function firstQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstChoices",
        message: "What would you like to do? ",
        choices: [
          { name: "View all departments", value: "viewDepartments" },
          { name: "View all roles", value: "viewRoles" },
          { name: "View all employees", value: "viewEmployees" },
          {name:"Add a department", value:"addDepartment"},
          {name:"Add a role", value:"addRole"}, 
          {name:"Add an employee", value:"addEmployee"}, 
        
        ],
      },


      
    ])
    .then((answers) => {
      switch (answers.firstChoices) {
        case "fetchDepartments":
          console.log("fetching departments...");
          getDeptInfo();
          firstQuestion();
          break;
        case "viewRoles":
          console.log("fetching roles...");
          getRoleInfo();
          firstQuestion();
          break;
        case "viewEmployees":
          console.log("fetching employees...");
          getEmployeeInfo();
          firstQuestion();
          break;
        default:
          console.log("invalid option");
          firstQuestion();
      }

    });


}

firstQuestion();
