# Apollonia Dental Practice Employee Management App

## Overview
A **full-stack CRUD web application** to manage employees and departments for **Apollonia Dental Practice**.  
Built with **Node.js**, **Express**, **MongoDB**, and a responsive **HTML/CSS/JavaScript frontend**.  
Supports adding, editing (via modal), deleting, and sorting employees by **first name**, **last name**, and **department(s)**.

🔗 **Live Demo**: [Apollonia CRUD App on Render](https://apollonia-crud-app.onrender.com)  
🔗 **Repository**: [GitHub Repo](https://github.com/KwameSA/apollonia-crud-app)

---

## Features
- **CRUD operations** for employees and departments
- **Modal-based editing** for a better user experience
- **Multi-select department assignment**
- **DataTables integration** for sorting, searching, and pagination
- **MongoDB Atlas** for cloud-hosted database
- **Dockerized** for consistent deployment
- **Deployed on Render** with environment variables

---

## Tech Stack
**Frontend:**
- HTML5, CSS3, JavaScript
- DataTables.js

**Backend:**
- Node.js, Express.js
- MongoDB, Mongoose

**Deployment:**
- Docker, Render
- MongoDB Atlas

---

## Access Web App Here (https://apollonia-crud-app.onrender.com/)

---

## Project Structure
apollonia-crud-app/
│── public/               # Frontend static files (HTML, CSS, JS)
│── models/               # Mongoose models (Department, Employee)
│── routes/               # Express routes for API
│── controllers/          # Controller logic for CRUD operations
│── config/               # Database connection
│── seed.js                # Script to seed initial data
│── app.js                 # Express server setup
│── Dockerfile             # Docker configuration
│── docker-compose.yml     # Multi-container setup for app + Mongo
│── .env.example           # Example environment variables
│── README.md              # Documentation


Deployment
Backend & frontend deployed on Render

Database hosted on MongoDB Atlas

Environment variables set in Render dashboard

What I Learned
* Connecting Node.js to MongoDB Atlas

* Creating REST APIs with Express.js

* Managing state and UI updates in vanilla JS

* Deploying full-stack apps with Docker & Render

* Handling environment variables securely in production

Author
Samuel Akuffo



