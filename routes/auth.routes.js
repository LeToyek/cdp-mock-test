const express = require('express');

const router = express.Router();

const { register,logOut } = require('../controllers/auth.controllers');

const passport = require('../lib/passport');

const restrict = require('../middlewares/restrict');

router.post('/register', register);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  successMessage: 'Welcome',
  failureRedirect: '/login',
}));
router.post('/logout',logOut);



router.get('/dashboard',restrict, (req, res) => {
  res.json({ message: 'Dashboard' });
});


module.exports = router;
