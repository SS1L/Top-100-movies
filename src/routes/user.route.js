const router = require('express').Router();
const user = require('../controllers/user.controller');

router.post('/login', user.login);
router.post('/registration', user.registration);
router.post('/logout', user.logout);

module.exports = router;
