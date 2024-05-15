const express = require('express');
const router = express.Router();
const { getTodo, addTodo, todoById, updateTodoById, deleteTodoById } = require('../controllers/todosController');

const verifyToken = require('../middleware/verifyToken');

router.get('/todos', verifyToken, getTodo);
router.post('/todos/create', verifyToken, addTodo);
router.get('/todos/:id', verifyToken, todoById);
router.patch('/todos/:id/update', verifyToken, updateTodoById);
router.delete('/todos/:id/delete', verifyToken, deleteTodoById);


module.exports = router;