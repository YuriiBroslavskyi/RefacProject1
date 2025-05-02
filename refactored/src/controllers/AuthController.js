const BaseController = require('./BaseController');
const { authService } = require('../container');

class AuthController extends BaseController {
    getRegister = async (req, res) => {
        res.render('register', { error: null });
    };

    postRegister = this.wrap(async (req, res) => {
        const { username, password } = req.body;
        const id = await authService.register({ username, password });
        req.session.userId = id;
        res.redirect('/');
    });

    getLogin = async (req, res) => {
        res.render('login', { error: null });
    };

    postLogin = this.wrap(async (req, res) => {
        const { username, password } = req.body;
        const id = await authService.login({ username, password });
        req.session.userId = id;
        res.redirect('/');
    });

    logout = (req, res) => {
        req.session.destroy(() => res.redirect('/login'));
    };
}

module.exports = new AuthController();
