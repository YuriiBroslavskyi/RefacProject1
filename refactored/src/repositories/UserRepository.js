// src/repositories/UserRepository.js
const pool = require('../db');
const User = require('../domain/User');

class UserRepository {
    async create({ username, password_hash }) {
        const [res] = await pool.execute(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, password_hash]
        );
        return res.insertId;
    }

    async findByUsername(username) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows[0] ? new User(rows[0]) : null;
    }
}

module.exports = UserRepository;
