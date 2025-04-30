const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.getRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('register', { error: 'Всі поля обов’язкові' });
    }
    const existing = await userModel.findUserByUsername(username);
    if (existing) {
        return res.render('register', { error: 'Користувач вже існує' });
    }
    const hash = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, hash);
    req.session.userId = userId;
    res.redirect('/');
};

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('login', { error: 'Всі поля обов’язкові' });
    }
    const user = await userModel.findUserByUsername(username);
    if (!user) {
        return res.render('login', { error: 'Невірні дані' });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
        return res.render('login', { error: 'Невірні дані' });
    }
    req.session.userId = user.id;
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
