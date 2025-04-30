const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

// Налаштування EJS
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статика

// Парсинг тіла
app.use(express.urlencoded({ extended: false }));

// Сесії
app.use(session({
    secret: 'mandarin-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
    // робимо доступним в усіх шаблонах змінну session
    res.locals.session = req.session;
    next();
});

app.use((req, res, next) => {
    if (!req.session.orders) req.session.orders = [];
    next();
});

// Роутери
app.use(authRoutes);
app.use(indexRoutes);

// Старт
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
}