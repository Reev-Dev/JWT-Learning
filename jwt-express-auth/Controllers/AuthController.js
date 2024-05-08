const { registerUser } = require('./Models/AuthModel');
const { body, validationResult } = require('express-validator');

async function register(req, res) {
    const validation = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().isEmail().withMessage('Email is required'),
        body('password').notEmpty().isPassword().withMessage('Password is required'),
        body('phone').notEmpty().isPhone().withMessage('Phone is required'),
    ]
}