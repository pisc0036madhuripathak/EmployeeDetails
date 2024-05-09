const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@#123pass#@",
  database: "employeedetails",
});
connection.connect(function (error) {
  if (error) throw error;
  connection.query("select * from employee_info", function (error, result) {
    if (error) throw error;
    // console.log(result);
  });
});

module.exports = connection;
