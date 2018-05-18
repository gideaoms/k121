const router = require('express').Router();
const userController = require('./controllers/user');
const lotteryController = require('./controllers/lottery');

/**
 * User
 */
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

/**
 * Lottery
 */
router.post('/lottery', lotteryController.run);

module.exports = router;
