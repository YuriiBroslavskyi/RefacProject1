const bcrypt = require('bcrypt');

class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async register({ username, password }) {
        const exists = await this.userRepo.findByUsername(username);
        if (exists) throw new Error('User exists');
        const hash = await bcrypt.hash(password, 10);
        const id = await this.userRepo.create({ username, password_hash: hash });
        return id;
    }

    async login({ username, password }) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) throw new Error('Invalid credentials');
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) throw new Error('Invalid credentials');
        return user.id;
    }
}

module.exports = AuthService;
