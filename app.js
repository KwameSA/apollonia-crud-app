const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");
const department = require("./models/department");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/apolloniaDB";
