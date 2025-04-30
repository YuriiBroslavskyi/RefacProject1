const db = require('../db');

async function createOrder(userId, mandarinId) {
    const [result] = await db.execute(
        'INSERT INTO orders (user_id, mandarin_id) VALUES (?, ?)',
        [userId, mandarinId]
    );
    return result.insertId;
}

async function getOrdersByUser(userId) {
    const [rows] = await db.execute(
        `SELECT o.id, m.name, m.price, o.order_date
     FROM orders o
     JOIN mandarins m ON o.mandarin_id = m.id
     WHERE o.user_id = ?
     ORDER BY o.order_date DESC`,
        [userId]
    );
    return rows;
}

module.exports = { createOrder, getOrdersByUser };
