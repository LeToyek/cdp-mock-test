const express = require('express');

const router = express.Router();

const { register } = require('../controllers/auth.controllers');

router.get('/register', (req, res) => {
  
});

router.post('/register', register);

module.exports = router;
