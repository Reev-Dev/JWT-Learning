const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

function createToken(id, name, classes, address, hobby) {
    const data = { id, name, classes, address, hobby };
    return jwt.sign(data, secretKey);
}

const arrSiswa = [
    {
        id: 1,
        name: 'Attar',
        classes: 'XI',
        address: 'Jakarta',
        hobby: 'Game'
    },
    {
        id: 2,
        name: 'Radid',
        classes: 'XI',
        address: 'Lampung',
        hobby: 'Bola'
    },
    {
        id: 3,
        name: 'Syahban',
        classes: 'XI',
        address: 'Sulawesi',
        hobby: 'Game'
    }
]

const arrToken = [];

// membuat perulangan siswa
arrSiswa.forEach(siswa => {
    const token = createToken(
        siswa.id, siswa.name, siswa.classes, siswa.address, siswa.hobby
    )
    arrToken.push(token);
})

// perulangan arrToken
arrToken.forEach((token, index) => {
    console.log(`Siswa dengan id ${index + 1} menggunakan token: ${token} \n`);
})