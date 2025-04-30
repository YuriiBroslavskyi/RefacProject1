const userModel = require('../../original/models/userModel');

describe('User Model', () => {
    it('should create a new user', async () => {
        const result = await userModel.createUser('testuser', '1234');
        expect(result.affectedRows).toBe(1);
    });

    it('should find a user by username', async () => {
        const user = await userModel.findUserByUsername('testuser');
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
    });

    it('should return null for unknown user', async () => {
        const user = await userModel.findUserByUsername('unknown');
        expect(user).toBeUndefined();
    });
});
