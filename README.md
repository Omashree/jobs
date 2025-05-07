# 🧑‍💼 Job Management Admin Interface

A full-stack web application that allows administrators to create and manage job postings. Built with **Node.js**, **Express.js**, **MySQL**, and **EJS**, this platform provides functionality to list, filter, and create job postings through an intuitive admin interface.

🔗 **Live Demo**: [https://jobs-3c33.onrender.com/](https://jobs-3c33.onrender.com/)

---

## ✨ Features

* **Job Listing Page**

  * View all job postings.
  * Filter jobs by:

    * Job Title
    * Location
    * Job Type (Full-time, Part-time, Contract, Internship)
    * Salary Range

* **Job Creation Page**

  * Add a new job with fields:

    * Job Title
    * Company Name
    * Location
    * Job Type (Dropdown)
    * Salary Range
    * Application Deadline
    * Job Description

* **Responsive UI** using EJS templates

* **Server-Side Rendering** for dynamic content loading

---

## 📁 Project Structure

```
.
├── public/
│   ├── script.js
│   └── style.css        # Static assets (CSS, JS)
├── views/               # EJS templates
│   └── home.ejs
├── .env                 # Environment variables
├── index.js             # Main Express server
├── package.json
```

---

## 🛠️ Tech Stack

* **Frontend**: HTML, CSS, EJS
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **Deployment**: Render

---

## 🏁 Getting Started

### Prerequisites

* Node.js and npm
* MySQL installed and running
* `.env` file configured with DB credentials

### Installation

```bash
git clone https://github.com/Omashree/jobs.git
cd jobs
npm install
```

### Setup Database

1. Create a MySQL database (e.g., `job_admin_db`)
2. Import the schema:

```sql
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(255),
  company_name VARCHAR(255),
  location VARCHAR(255),
  job_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship'),
  min_salary VARCHAR(255),
  max_salary VARCHAR(255),
  deadline DATE,
  job_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  min_exp INT DEFAULT 1,
  max_exp INT DEFAULT 3,
  location_type VARCHAR(255) DEFAULT 'Onsite'
);
```

3. Create a `.env` file in the root with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=job_admin_db
PORT=3000
```

### Run Locally

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 📸 Screenshots



---

## 📌 Future Improvements

* Admin authentication and login
* Pagination on job list
* Edit/Delete job postings
* Rich text editor for job description

---

## 📄 License

This project is licensed under the MIT License.

---
