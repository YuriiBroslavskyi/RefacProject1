const db = require('../db');

async function getAllMandarins() {
    const [rows] = await db.execute('SELECT * FROM mandarins');
    return rows;
}

async function findMandarinById(id) {
    const [rows] = await db.execute(
        'SELECT * FROM mandarins WHERE id = ?',
        [id]
    );
    return rows[0];
}

module.exports = { getAllMandarins, findMandarinById };
