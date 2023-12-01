const express = require('express');

const router = express.Router();

const { register,login } = require('../controllers/auth.controllers');

const passport = require('../lib/passport');

router.post('/register', register);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}), login);

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Dashboard' });
});


module.exports = router;
