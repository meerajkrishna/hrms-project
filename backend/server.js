const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/hrms")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number
});

const Employee = mongoose.model("Employee", employeeSchema);

// ✅ GET
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// ✅ POST
app.post("/employees", async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.json(newEmployee);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});