const Order = require('../domain/Order');

class OrderRepository {
    save(mandarin, session) {
        const order = new Order({
            id: mandarin.id,
            name: mandarin.name,
            price: mandarin.price,
            date: new Date().toLocaleString('uk-UA')
        });
        session.orders.push(order);
        return order;
    }

    findAll(session) {
        return session.orders;
    }
}

module.exports = OrderRepository;
