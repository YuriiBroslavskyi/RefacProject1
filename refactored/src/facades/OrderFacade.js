class OrderFacade {
    constructor(factory, service) {
        this.factory = factory;
        this.service = service;
    }

    placeOrder(id, session) {
        const mandarin = this.factory.create(id);
        if (!mandarin) {
            throw new Error('Товар не знайдено');
        }
        return this.service.createOrder(mandarin, session);
    }

    getAll(session) {
        return this.service.getAllOrders(session);
    }
}

module.exports = OrderFacade;
