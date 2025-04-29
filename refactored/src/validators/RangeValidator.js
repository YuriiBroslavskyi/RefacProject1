const data = require('../config/mandarins');

class RangeValidator {
    validate(req) {
        const id = parseInt(req.body.id, 10);
        if (!data.some(m => m.id === id)) {
            throw new Error('ID out of range');
        }
    }
}

module.exports = RangeValidator;
