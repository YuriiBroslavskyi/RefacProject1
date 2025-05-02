class User {
    constructor({ id, username, password_hash, created_at }) {
        this.id = id;
        this.username = username;
        this.password_hash = password_hash;
        this.created_at = created_at;
    }
}
module.exports = User;
