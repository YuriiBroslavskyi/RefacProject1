const MandarinFactory = require('./factories/MandarinFactory');
const UserRepository = require('./repositories/UserRepository');
const MandarinRepository = require('./repositories/MandarinRepository');
const OrderRepository = require('./repositories/OrderRepository');
const TimingDecorator = require('./decorators/TimingDecorator');

const AuthService = require('./services/AuthService');
const OrderService = require('./services/OrderService');

const SessionNotifier = require('./strategies/SessionNotifier');

const RequiredValidator = require('./validators/RequiredValidator');
const NumberValidator = require('./validators/NumberValidator');
const RangeValidator = require('./validators/RangeValidator');

const OrderFacade = require('./facades/OrderFacade');

// — Репозиторії —
const userRepo = new UserRepository();
const mandarinRepo = new MandarinRepository();
const rawOrderRepo = new OrderRepository();

// Декоруємо репозиторій для логування часу
const orderRepo = new TimingDecorator(rawOrderRepo);

// — Сервіси —
const authService = new AuthService(userRepo);
const orderService = new OrderService(orderRepo);

// — Фасад для замовлень —
const orderFacade = new OrderFacade(MandarinFactory, orderService);

// — Нотифікатор сесії —
const notifier = new SessionNotifier();

// — Ланцюжок валідаторів (Chain of Responsibility) —
const requiredValidator = new RequiredValidator();
const numberValidator = requiredValidator.setNext(new NumberValidator());
const rangeValidator = numberValidator.setNext(new RangeValidator(mandarinRepo));

// — Експорт всього —
module.exports = {
    userRepo,
    mandarinRepo,
    orderRepo,
    authService,
    orderService,
    orderFacade,
    notifier,
    validatorChain: requiredValidator
};
