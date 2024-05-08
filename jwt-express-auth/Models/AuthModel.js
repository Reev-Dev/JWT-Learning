const { connection } = require('../Config/Connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(name, email, password, phone) {
    try {
        // cek apakah email ini sudah terdaftar /belum?
        const [existingEmailUser] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingEmailUser.length > 0) throw new Error('Email already exists');

        // kita hash passwordnya agar tidak dapat dibaca artinya pastikan yang kita tulis passwordnya hafal
        // jamal = 1234567890abcdef
        const hashedPassword = await bcrypt.hash(password, 16);

        // kalau tidak ada maka kita boleh buat email tersebut
        const [newUser] = await connection.query(
            'INSERT INTO user (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone]
        );

        return {
            success: true,
            message: 'User has been created',
            data: newUser
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

// Login
module.exports = {
    registerUser
};

