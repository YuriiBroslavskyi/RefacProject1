// src/domain/Order.js
class Order {
    constructor({ id, user_id, mandarin_id, order_date, name, price }) {
        this.id = id;
        this.user_id = user_id;
        this.mandarin_id = mandarin_id;
        this.order_date = order_date;
        this.name = name;
        this.price = price;
    }
}
module.exports = Order;
