const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/index');
const { logIn, logout, register } = require('../controllers/auth');

const router = Router();

router.post('/logIn', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
 validateField
], logIn);

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('lastname', 'Lastname is required').not().isEmpty(),
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateField
], register);

router.post('/logout', logout);

module.exports = router;



