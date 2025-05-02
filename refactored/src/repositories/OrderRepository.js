const pool = require('../db');
const Order = require('../domain/Order');

class OrderRepository {
    async save(mandarin, userId) {
        const [res] = await pool.execute(
            'INSERT INTO orders (user_id, mandarin_id) VALUES (?, ?)',
            [userId, mandarin.id]
        );
        const orderId = res.insertId;
        const [rows] = await pool.execute(
            `SELECT o.id,o.user_id,o.mandarin_id,o.order_date,
              m.name,m.price
       FROM orders o
       JOIN mandarins m ON m.id=o.mandarin_id
       WHERE o.id = ?`,
            [orderId]
        );
        return new Order(rows[0]);
    }

    async findByUser(userId) {
        const [rows] = await pool.execute(
            `SELECT o.id,o.user_id,o.mandarin_id,o.order_date,
              m.name,m.price
       FROM orders o
       JOIN mandarins m ON m.id=o.mandarin_id
       WHERE o.user_id = ?
       ORDER BY o.order_date DESC`,
            [userId]
        );
        return rows.map(r => new Order(r));
    }
}

module.exports = OrderRepository;
