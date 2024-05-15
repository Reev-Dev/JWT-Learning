const connection = require('../config/connection');
const { body, validationResult } = require('express-validator');
const runValidation = require('../config/validationFields');

async function listTodo(userId) {
    try {
        const [todos] = await connection.query('SELECT * FROM todos WHERE user_id = ?'[userId]);
        return {
            status: true,
            message: 'Success get todos',
            data: todos
        }
    } catch (err) {
        console.error(err);
    }
}

async function createTodo(title, description, userId) {
    // cek validasi
    const validation = [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required')
    ];

    const validationErrors = await runValidation(validation, { title, description });
    if (validationErrors) {
        return {
            status: false,
            message: 'Validation errors',
            error: validationErrors
        };
    }

    try {
        const [newTodo] = await connection.query('INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId]);
        return {
            status: true,
            message: 'Todo has been created',
            data: {
                id: newTodo.insertId,
                title, description, userId
            }
        }
    } catch (err) {
        console.error(err);
    }
}

async function showTodo(todoId, userId) {
    try {
        const [todo] = await connection.query('SELECT * FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);
        return {
            status: true,
            message: 'Success get todo',
            data: todo
        }
    } catch (err) {
        console.error(err);
    }
}

async function updateTodo(todoId, title, description, userId) {
    // cek validasi
    const validation = [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required')
    ];

    const validationErrors = await runValidation(validation, { title, description });
    if (validationErrors) {
        return {
            status: false,
            message: 'Validation errors',
            error: validationErrors
        };
    }
    try {
        const [updatedTodo] = await connection.query('UPDATE todos SET title = ?, description = ? WHERE id = ? AND user_id = ?', [title, description, todoId, userId]);
        if (updatedTodo.affectedRows === 0) {
            return {
                status: false,
                message: 'Todo not found'
            }
        }
        const result = {
            id: Number(todoId),
            title: description,
            userId
        }
        return {
            status: true,
            message: 'Todo has been updated',
            data: result
        }
    } catch (err) {
        console.error(err);
    }
}

async function deleteTodo(todoId, userId) {
    try {
        const [deletedTodo] = await connection.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);
        return {
            status: true,
            message: 'Todo has been deleted',
            data: deletedTodo
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    listTodo,
    createTodo,
    showTodo,
    updateTodo,
    deleteTodo
};
