class TimingDecorator {
    constructor(service) {
        this.service = service;
    }

    save(...args) {
        console.time('OrderRepository.save');
        const result = this.service.save(...args);
        console.timeEnd('OrderRepository.save');
        return result;
    }

    findAll(...args) {
        console.time('OrderRepository.findAll');
        const result = this.service.findAll(...args);
        console.timeEnd('OrderRepository.findAll');
        return result;
    }
}

module.exports = TimingDecorator;
