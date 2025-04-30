const RequiredValidator = require('../../original/validators/RequiredValidator');
const NumberValidator = require('../../original/validators/NumberValidator');

describe('Validators', () => {
    it('RequiredValidator passes with value', async () => {
        const validator = new RequiredValidator();
        const errors = await validator.validate('value');
        expect(errors.length).toBe(0);
    });

    it('RequiredValidator fails with empty value', async () => {
        const validator = new RequiredValidator();
        const errors = await validator.validate('');
        expect(errors.length).toBeGreaterThan(0);
    });

    it('NumberValidator passes with number', async () => {
        const validator = new NumberValidator();
        const errors = await validator.validate(5);
        expect(errors.length).toBe(0);
    });

    it('NumberValidator fails with string', async () => {
        const validator = new NumberValidator();
        const errors = await validator.validate('five');
        expect(errors.length).toBeGreaterThan(0);
    });
});
