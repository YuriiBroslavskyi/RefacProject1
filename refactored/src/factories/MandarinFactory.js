const Mandarin = require('../domain/Mandarin');
const data = require('../config/mandarins');

class MandarinFactory {
    static create(id) {
        const record = data.find(m => m.id === parseInt(id, 10));
        return record ? new Mandarin(record) : null;
    }
}

module.exports = MandarinFactory;
