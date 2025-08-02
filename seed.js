const mongoose = require("mongoose");
require("dotenv").config();
const Department = require("./models/department");
const Employee = require("./models/employee");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongoose");

    await Department.deleteMany();
    await Employee.deleteMany();

    const deptNames = ["General Dentistry", "Pediatric Dentistry", "Restorative Dentistry", "Surgery", "Orthodontics", "Oral Pathology", "Endodontics", "Periodontics", "Prosthodontics", "Dental Hygienist", "Dental Assistant", "Receptionist", "Office Manager", "Medical Records Technician", "Phlebotomist", "Radiology Technician", "Pharmacist", "Nurse", "Physician", "Surgeon", "Anesthesiologist", "IT Support Specialist", "Health Information Technician", "Clinical Data Analyst", "Medical Billing Specialist", "Network Administrator", "Software Developer", "Cybersecurity Specialist", "Telehealth Coordinator"];
    const departments = await Department.insertMany(deptNames.map((name) => ({ name })));
    const getDeptId = (name) => {
      const dept = departments.find((d) => d.name === name);
      return dept ? dept._id : null;
    };

    const employees = [
      { firstName: "Alfred", lastName: "Christensen", departments: [getDeptId("General Dentistry")] },
      { firstName: "John", lastName: "Dudley", departments: [getDeptId("General Dentistry")] },
      { firstName: "Janet", lastName: "Doe", departments: [getDeptId("General Dentistry")] },
      { firstName: "Francisco", lastName: "Willard", departments: [getDeptId("Pediatric Dentistry")] },
      { firstName: "Sarah", lastName: "Alvarez", departments: [getDeptId("Pediatric Dentistry")] },
      { firstName: "Lisa", lastName: "Harris", departments: [getDeptId("Restorative Dentistry"), getDeptId("Orthodontics")] },
      { firstName: "Danny", lastName: "Perez", departments: [getDeptId("Restorative Dentistry")] },
      { firstName: "Constance", lastName: "Smith", departments: [getDeptId("Surgery")] },
      { firstName: "Leslie", lastName: "Roche", departments: [getDeptId("Orthodontics")] },
      { firstName: "Travis", lastName: "Combs", departments: [] },
    ];

    await Employee.insertMany(employees);
    console.log("Database seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
