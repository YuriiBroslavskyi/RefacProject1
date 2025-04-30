const mandarinModel = require('../../original/models/mandarinModel');

describe('Mandarin Model', () => {
    it('should return all mandarins', async () => {
        const mandarins = await mandarinModel.findAll();
        expect(Array.isArray(mandarins)).toBe(true);
        expect(mandarins.length).toBeGreaterThan(0);
    });

    it('should find mandarin by ID', async () => {
        const mandarin = await mandarinModel.findById(1);
        expect(mandarin).toBeDefined();
        expect(mandarin.id).toBe(1);
    });

    it('should return null if mandarin not found', async () => {
        const mandarin = await mandarinModel.findById(9999);
        expect(mandarin).toBeUndefined();
    });
});
