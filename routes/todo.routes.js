const express = require('express');

const router = express.Router();

const todo = require('../controllers/todo.controllers');

const restrict = require('../middlewares/restrict');

router.post('/add', restrict, todo.addTodo);
router.get('/get', restrict, todo.getTodo);
router.put('/update/:id', restrict, todo.updateTodo);
router.delete('/delete/:id', restrict, todo.deleteTodo);

module.exports = router;