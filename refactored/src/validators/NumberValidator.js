class NumberValidator {
    setNext(next) { this.next = next; return next; }
    validate(req) {
        if (isNaN(parseInt(req.body.id, 10))) throw new Error('ID must be number');
        if (this.next) this.next.validate(req);
    }
}
module.exports = NumberValidator;
