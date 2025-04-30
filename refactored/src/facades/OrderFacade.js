// src/facades/OrderFacade.js
class OrderFacade {
    constructor(factory, orderService) {
        this.factory = factory;
        this.orderService = orderService;
    }

    async placeOrder(id, session) {
        const mandarin = await this.factory.create(id);
        if (!mandarin) throw new Error('Not found');
        const order = await this.orderService.place(mandarin, session.userId);
        return order;
    }

    async getOrders(session) {
        return this.orderService.list(session.userId);
    }
}
module.exports = OrderFacade;
