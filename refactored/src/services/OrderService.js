// refactored/src/services/orderService.js

class OrderService {
    /**
     * Якщо передали об’єкт-сесію (legacy), або
     * репозиторій (DI-mode)
     */
    constructor(arg) {
        if (arg && Array.isArray(arg.orders)) {
            // legacy mode: інжектимо сесію напряму
            this.session = arg;
            this.legacy = true;
        } else {
            // DI mode: інжектимо репозиторій
            this.repository = arg;
            this.legacy = false;
        }
    }

    /** Legacy-only: повернути масив замовлень */
    getAll() {
        if (!this.legacy) {
            throw new Error('getAll() available only in legacy mode');
        }
        return this.session.orders;
    }

    /** DI-only: повернути масив через репозиторій */
    getAllOrders(session) {
        if (this.legacy) {
            throw new Error('getAllOrders() available only in DI mode');
        }
        return this.repository.findAll(session);
    }

    /**
     * createOrder(data, [session])
     * - legacy: data = {id,name,price}
     * - DI:      data = Mandarin-domain, session = req.session
     */
    createOrder(data, session) {
        if (this.legacy) {
            // legacy behavior: пушимо прямо в session.orders
            const order = {
                id: data.id,
                name: data.name,
                price: data.price,
                date: new Date().toLocaleString('uk-UA')
            };
            this.session.orders.push(order);
            return order;
        } else {
            // DI behavior
            return this.repository.save(data, session);
        }
    }
}

module.exports = OrderService;
