const router = require('express').Router();
const userMiddleware = require('./middlewares/user');
const userController = require('./controllers/user');
const lotteryController = require('./controllers/lottery');

/**
 * User
 */
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users', userMiddleware.validate(), userController.create);
router.put('/users/:id', userMiddleware.validate(), userController.update);
router.delete('/users/:id', userController.destroy);

/**
 * Lottery
 */
router.post('/lottery', lotteryController.run);

module.exports = router;
