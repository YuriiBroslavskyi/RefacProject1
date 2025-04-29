class BaseController {
    wrap(action) {
        return async (req, res, next) => {
            try {
                await action(req, res, next);
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        };
    }
}

module.exports = BaseController;
