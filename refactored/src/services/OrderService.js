// src/services/OrderService.js
class OrderService {
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }

    async place(mandarin, userId) {
        return this.orderRepo.save(mandarin, userId);
    }

    async list(userId) {
        return this.orderRepo.findByUser(userId);
    }
}

module.exports = OrderService;
