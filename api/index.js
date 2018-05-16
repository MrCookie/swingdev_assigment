const router = require('express').Router();

router.use('/order', require('./order'));

router.use('*', (req, res, next) => {
	res.sendStatus(400);
})

module.exports = router;