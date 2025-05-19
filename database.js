const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 34.28.99.134,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Koneksi ke database berhasil");
});

module.exports = db;
