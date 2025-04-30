// src/validators/RangeValidator.js

class RangeValidator {
    constructor(mandarinRepo) {
        this.mandarinRepo = mandarinRepo;
    }

    async validate(req) {
        const all = await this.mandarinRepo.findAll();
        const id = parseInt(req.body.id, 10);
        if (!all.some(m => m.id === id)) {
            throw new Error('ID out of range');
        }
    }
}

module.exports = RangeValidator;
