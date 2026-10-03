require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: 5,
    ssl: process.env.DB_SSL === "true"
        ? { ca: fs.readFileSync(path.join(__dirname, "..", "certs", "ca.pem")), rejectUnauthorized: true }
        : undefined,
});

module.exports = db;