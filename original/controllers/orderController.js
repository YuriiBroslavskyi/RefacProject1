// Припустимо, що є фіктивний перелік мандарин
const MANDARINS = [
    { id: 1, name: 'Соковита мандаринка', price: 5 },
    { id: 2, name: 'Солодка мандаринка', price: 6 },
    { id: 3, name: 'Органічна мандаринка', price: 8 },
];

exports.getIndex = (req, res) => {
    res.render('index', {
        mandarins: MANDARINS,
        message: req.session.lastMessage || null
    });
    // Після відображення прибираємо одноразове повідомлення
    req.session.lastMessage = null;
};

exports.postOrder = (req, res) => {
    const id = parseInt(req.body.id, 10);
    const mandarin = MANDARINS.find(m => m.id === id);
    if (mandarin) {
        req.session.orders.push({
            id: mandarin.id,
            name: mandarin.name,
            price: mandarin.price,
            date: new Date().toLocaleString('uk-UA')
        });
        req.session.lastMessage = `Ви успішно замовили: ${mandarin.name}`;
    } else {
        req.session.lastMessage = 'Помилка: такого товару не знайдено.';
    }
    res.redirect('/');
};

exports.getProfile = (req, res) => {
    res.render('profile', {
        orders: req.session.orders
    });
};

exports.MANDARINS = MANDARINS;