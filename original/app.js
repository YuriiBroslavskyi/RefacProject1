const express = require('express');
const session = require('express-session');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статика
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг тіла POST
app.use(express.urlencoded({ extended: false }));

// Налаштування сесій
app.use(session({
    secret: 'mandarin-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Ініціалізація масиву замовлень у сесії
app.use((req, res, next) => {
    if (!req.session.orders) {
        req.session.orders = [];
    }
    next();
});

// Маршрути
app.use('/', indexRouter);

// Експортуємо express-app для тестів
module.exports = app;

// Локальний запуск тільки при прямому виклику
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);  // без console.log
}
