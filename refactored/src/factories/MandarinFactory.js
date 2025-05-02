const Mandarin = require('../domain/Mandarin');
const pool = require('../db');

class MandarinFactory {
    static async create(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM mandarins WHERE id = ?',
            [id]
        );
        return rows[0] ? new Mandarin(rows[0]) : null;
    }
}

module.exports = MandarinFactory;
