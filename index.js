const connection = require("./db/database");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;

app.post("/employeeRegister", (req, res) => {
  const sql =
    "INSERT INTO employee_info(`employee_name`,`mobile_no`,`employee_address`,`employee_designation`,`employee_degree`) VALUES(?,?,?,?,?)";
  const values = [
    req.body.employee_name,
    req.body.mobile_no,
    req.body.employee_address,
    req.body.employee_designation,
    req.body.employee_degree,
  ];
  connection.query(sql, values, (error, result) => {
    if (error)
      return res.json({ message: "Something unexpected has occured" + error });
    return res.json({ success: "Student added successfully" });
  });
});
app.get("/employeesDetails", (req, res) => {
  const sql = "SELECT * FROM employee_info";
  connection.query(sql, (error, result) => {
    if (error)
      return res.json({
        message: "Employee Details could not fetched" + error,
      });
    return res.json({ success: "Employees Details !", result });
  });
});
app.get("/employeeFindById/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee_info where `id` = ?";
  connection.query(sql, [id], (error, result) => {
    if (error)
      return res.json({ message: "Employee Detail could not fetched" + error });
    return res.json({ success: "Employee Detail !", result });
  });
});
app.post("/employeeEdit/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employee_info SET `employee_name`=? , `mobile_no`=? ,`employee_address`=? , `employee_designation`=? , `employee_degree`=? WHERE `id`=? ";
  const values = [
    req.body.employee_name,
    req.body.mobile_no,
    req.body.employee_address,
    req.body.employee_designation,
    req.body.employee_degree,
    id,
  ];
  connection.query(sql, values, (error, result) => {
    if (error)
      return res.json({ message: "Employee Detail is not updated" + error });
    return res.json({
      success: "Employee Detail updated successfully",
      result,
    });
  });
});
app.delete("/employeeDelete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee_info WHERE id=?";
  console.log("id", id);
  connection.query(sql, value, (error, result) => {
    if (error) return res.json({ message: "Employee is not deleted" + error });
    return res.json({ success: "Employee deleted successfully" });
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
