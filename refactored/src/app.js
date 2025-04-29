const express = require('express');
const path = require('path');
const session = require('express-session');
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'mandarin-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Ініціалізуємо масив замовлень у сесії
app.use((req, res, next) => {
    if (!req.session.orders) req.session.orders = [];
    next();
});

app.use('/', indexRouter);

module.exports = app;

// Локальний запуск
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
}
