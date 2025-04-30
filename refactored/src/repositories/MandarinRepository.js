// src/repositories/MandarinRepository.js
const pool = require('../db');
const Mandarin = require('../domain/Mandarin');

class MandarinRepository {
    async findAll() {
        const [rows] = await pool.execute('SELECT * FROM mandarins');
        return rows.map(r => new Mandarin(r));
    }
}

module.exports = MandarinRepository;
