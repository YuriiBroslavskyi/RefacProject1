const db = require('../db');

async function createUser(username, passwordHash) {
    const [result] = await db.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [username, passwordHash]
    );
    return result.insertId;
}

async function findUserByUsername(username) {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    return rows[0];
}

module.exports = { createUser, findUserByUsername };
