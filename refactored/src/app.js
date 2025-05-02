const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mandarin-refactored-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use((req, res, next) => { res.locals.session = req.session; next(); });

app.use(authRoutes);
app.use(indexRoutes);

const PORT = process.env.PORT || 3000;
module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
}
