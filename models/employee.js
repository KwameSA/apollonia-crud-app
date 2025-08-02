const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
});

module.exports = mongoose.model("Employee", employeeSchema);
