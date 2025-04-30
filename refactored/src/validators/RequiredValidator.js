// src/validators/RequiredValidator.js
class RequiredValidator {
    setNext(next) { this.next = next; return next; }
    validate(req) {
        if (!req.body.id) throw new Error('ID required');
        if (this.next) this.next.validate(req);
    }
}
module.exports = RequiredValidator;
