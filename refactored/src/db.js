const mysql = require('mysql2/promise');
const { HOST, DB_USER, PASSWORD, DB } = require('./config/mysql');

const pool = mysql.createPool({
    host: HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
