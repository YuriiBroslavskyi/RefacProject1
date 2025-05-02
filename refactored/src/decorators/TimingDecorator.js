class TimingDecorator {
    constructor(repo) { this.repo = repo; }
    async save(...args) {
        console.time('OrderRepository.save');
        const res = await this.repo.save(...args);
        console.timeEnd('OrderRepository.save');
        return res;
    }
    async findByUser(...args) {
        console.time('OrderRepository.findByUser');
        const res = await this.repo.findByUser(...args);
        console.timeEnd('OrderRepository.findByUser');
        return res;
    }
}
module.exports = TimingDecorator;
