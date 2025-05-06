const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');
const utc = require('dayjs/plugin/utc');
require('dotenv').config();
const port = process.env.render_port || 4000;

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected.');
});

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

function shortTime(date) {
    const now = dayjs();
    const created = dayjs(date);
    const diffInSeconds = now.diff(created, 'second');
  
    if (diffInSeconds < 60) return `${diffInSeconds}s Ago`;
    const diffInMinutes = now.diff(created, 'minute');
    if (diffInMinutes < 60) return `${diffInMinutes}min Ago`;
    const diffInHours = now.diff(created, 'hour');
    if (diffInHours < 24) return `${diffInHours}h Ago`;
    const diffInDays = now.diff(created, 'day');
    if (diffInDays < 30) return `${diffInDays}d Ago`;
    const diffInMonths = now.diff(created, 'month');
    if (diffInMonths < 12) return `${diffInMonths}month Ago`;
    const diffInYears = now.diff(created, 'year');
    return `${diffInYears}y Ago`;
}

app.get('/', (req, res) => {
  const { job_title, location, job_type, max_salary } = req.query;
  let sql = 'SELECT * FROM jobs WHERE 1';
  let params = [];

  if (job_title && job_title.trim() !== '') {
    sql += ' AND job_title LIKE ?';
    params.push(`%${job_title}%`);
  }
  if (location && location.trim() !== '') {
    sql += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  if (job_type) {
    sql += ' AND job_type = ?';
    params.push(job_type);
  }
  if (max_salary) {
    sql += ' AND max_salary >= ?';
    params.push(Number(max_salary));
  }

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    const jobsWithTime = results.map(job => ({
        ...job,
        time: shortTime(job.created_at)
    }));
    res.render('home', { jobs: jobsWithTime, job_title, location, job_type, max_salary });
  });
});

app.post('/create', (req, res) => {
  const {
    job_title,
    company_name,
    location,
    job_type,
    min_salary,
    max_salary,
    job_description,
    deadline
  } = req.body;

  const sql = `INSERT INTO jobs (job_title, company_name, location, job_type, min_salary, max_salary, job_description, deadline)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    job_title,
    company_name,
    location,
    job_type,
    min_salary,
    max_salary,
    job_description,
    deadline
  ];

  db.query(sql, params, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
