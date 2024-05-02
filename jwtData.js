const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

function createToken(id, name, classes, address, hobby) {
    const data = { id, name, classes, address, hobby };
    return jwt.sign(data, secretKey);
}

function verify(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        delete decoded.iat;
        return decoded;
    } catch (err) {
        // console.errosr(err);
        return null;
    }
}

// data siswa
const siswa = {
    id: 1,
    name: "Budi",
    classes: "XI",
    address: "Cibubur",
    hobby: "Game"
}

// membuat token siswa
const token = createToken(siswa.id, siswa.name, siswa.classes, siswa.address, siswa.hobby);
console.log('token: ', token);

// verif data siswa
const decodedSiswa = verify(token);
console.log('decodedSiswa: ', decodedSiswa);