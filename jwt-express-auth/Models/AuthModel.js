const connection = require('../Config/Connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register
async function registerUser(name, email, password, phone) {
    try {
        // cek apakah email ini sudah terdaftar /belum?
        const [existingEmailUser] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingEmailUser.length > 0) throw new Error('Email already exists');

        // cek dan hash password
        const hashedPassword = await bcrypt.hash(password, 16);

        // kalau tidak ada maka kita boleh buat email tersebut
        const [newUser] = await connection.query(
            'INSERT INTO user (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone]
        );

        const [createdUser] = await connection.query('SELECT * FROM user WHERE id = ?', [newUser.insertId]);

        return {
            success: true,
            message: 'User has been created',
            data: createdUser[0]
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

// Login
async function loginUser(email, password) {
    try {
        // cek email sudah terdaftar atau belum
        const [existingEmailUser] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingEmailUser.length === 0) throw new Error;

        const user = existingEmailUser[0];

        // cek password benar atau salah
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error;

        // jika email dan password cocok, buat token jwt
        const token = jwt.sign({ id: user.id }, 'bazmaSecretKey', {
            expiresIn: '7h'
        });

        return {
            success: true,
            message: 'User has been logged in successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        };
    } catch (error) {
        console.error(error);
        throw new Error('Login failed!');
    }
}

// get me dengan jwt
async function getMe(token) {
    try {
        const decoded = jwt.verify(token, 'bazmaSecretKey');
        const [checkUser] = await connection.query('SELECT * FROM user WHERE id = ?', [decoded.id]);

        const user = checkUser[0];
        return {
            success: true,
            message: 'User data fetched successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        }
    } catch (error) {
        throw new Error(error);
    }
}

// logout
async function logoutUser(token) {
    try {
        const decoded = jwt.verify(token, 'bazmaSecretKey');
        jwt.sign({ id: decoded.id }, 'bazmaSecretKey', {
            expiresIn: '7h'
        });
        return {
            success: true,
            message: 'Logout successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
};

