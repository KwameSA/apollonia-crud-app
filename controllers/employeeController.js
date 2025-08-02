const Employee = require("../models/employee");
const Department = require("../models/department");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("departments", "name");
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, departments } = req.body;

    const newEmployee = new Employee({
      firstName,
      lastName,
      departments,
    });

    await newEmployee.save();
    const populatedEmployee = await newEmployee.populate("departments", "name");
    res.status(201).json(populatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, departments } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.id, { firstName, lastName, departments }, { new: true }).populate("departments", "name");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("departments");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
