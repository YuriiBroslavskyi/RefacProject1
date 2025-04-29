const MandarinFactory = require('./factories/MandarinFactory');
const OrderRepository = require('./repositories/OrderRepository');
const TimingDecorator = require('./decorators/TimingDecorator');
const SessionNotifier = require('./strategies/SessionNotifier');
const OrderService = require('./services/OrderService');
const OrderFacade = require('./facades/OrderFacade');
const RequiredValidator = require('./validators/RequiredValidator');
const NumberValidator = require('./validators/NumberValidator');
const RangeValidator = require('./validators/RangeValidator');

// Побудова ланцюжка валідаторів
const required = new RequiredValidator();
const number = required.setNext(new NumberValidator());
number.setNext(new RangeValidator());

// Декорований репозиторій
const repository = new TimingDecorator(new OrderRepository());

// Сервіс та фасад
const service = new OrderService(repository);
const facade = new OrderFacade(MandarinFactory, service);

// Нотифікатор
const notifier = new SessionNotifier();

module.exports = {
    facade,
    notifier,
    validatorChain: required
};
