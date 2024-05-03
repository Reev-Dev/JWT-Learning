const jwt = require('jsonwebtoken');
const secretKey = 'libur_lebaran_guys';

// Fungsi untuk membuat token peserta
function createToken(fullName, address, contact) {
    const data = { fullName, address, contact };
    return jwt.sign(data, secretKey, { expiresIn: '24h' });
}

// Fungsi untuk membuat token liburan
function createTokenLiburan(data) {
    // Buat token dengan payload data dan waktu kedaluwarsa yang lebih panjang
    const token = jwt.sign(data, secretKey, { expiresIn: '168h' }); // Bertahan 1 Minggu
    return token;
}

// Fungsi untuk memverifikasi token
function verify(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        delete decoded.iat;
        return decoded;
    } catch (err) {
        return null;
    }
}

const peserta = [
    {
        id: 1,
        fullName: 'Adli Bakwan',
        address: 'Priuk Kera, Jakut.',
        contact: '081234567890'
    },
    {
        id: 2,
        fullName: 'Attar Tempe',
        address: 'Cipance, Jaktim.',
        contact: '083456789012'
    },
    {
        id: 3,
        fullName: 'Raqi Duren',
        address: 'Bojong Besar, Bogor.',
        contact: '085678901234'
    },
    {
        id: 4,
        fullName: 'Rofi Seblak',
        address: 'Cilangsat, Bekasu.',
        contact: '087890123456'
    },
    {
        id: 5,
        fullName: 'Syahban Gula Merah',
        address: 'Entendang, Sulsel',
        contact: '089012345678'
    }
]

const liburan = [
    {
        destinasi: 'Raja Ampat',
        waktu: '3 hari',
        paket: 'Ekonomi'
    },
    {
        destinasi: 'Ancol',
        waktu: '1 hari',
        paket: 'Eksekutif'
    },
    {
        destinasi: 'TMII',
        waktu: '2 hari',
        paket: 'Ekonomi'
    },
    {
        destinasi: 'Malioboro',
        waktu: '7 hari',
        paket: 'Eksekutif'
    },
    {
        destinasi: 'Singapura',
        waktu: '6 hari',
        paket: 'Bisnis'
    }
]

const arrToken = [];
const arrLiburan = [];

// 1: buat token peserta
peserta.forEach(peserta => {
    const token = createToken(
        peserta.id, peserta.fullName, peserta.address, peserta.contact
    )
    arrToken.push(token);
})

arrToken.forEach((token, index) => {
    console.log(`Peserta dengan id ${index + 1} menggunakan token: ${token} \n`);
})

// 2: verif data peserta
arrToken.forEach((token, index) => {
    const decodedPeserta = verify(token);
    console.log('decodedPeserta: ', decodedPeserta);
})

// 3: buat token jadwal
liburan.forEach(liburan => {
    const token = createTokenLiburan(liburan)
    arrLiburan.push(token);
})

arrLiburan.forEach((token, index) => {
    console.log(`Liburan dengan id ${index + 1} menggunakan token: ${token} \n`);
})

// 4: verif data jadwal
arrLiburan.forEach((token, index) => {
    const decodedLiburan = verify(token);
    console.log('decodedLiburan: ', decodedLiburan);
})
