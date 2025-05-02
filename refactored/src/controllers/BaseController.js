class BaseController {
    wrap(action) {
        return async (req, res, next) => {
            try {
                await action(req, res, next);
            } catch (e) {
                console.error(e);
                req.session.lastMessage = e.message;
                return res.redirect('/');
            }
        };
    }
}
module.exports = BaseController;
