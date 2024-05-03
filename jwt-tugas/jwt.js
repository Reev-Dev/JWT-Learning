const jwt = require('jsonwebtoken');
const secretKey = 'libur_lebaran_guys';

// Fungsi untuk membuat token peserta
function createToken(fullName, address, contact) {
    const data = { fullName, address, contact };
    return jwt.sign(data, secretKey, { expiresIn: '24h' });
}

// Fungsi untuk membuat token jadwal kegiatan
function createTokenKegiatan(data) {
    // Buat token dengan payload data dan waktu kedaluwarsa yang lebih panjang
    const token = jwt.sign(data, secretKey, { expiresIn: '72h' }); // Bertahan 72 jam
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

const peserta = {
    fullName: 'Budi Luhur',
    address: 'Jl. Raya Cikampak Cicadas, Bogor, Jawa Barat.',
    contact: '081234567890'
};

const jadwalKegiatan = {
    waktuShalat: {
        subuh: '04:30',
        dzuhur: '12:00',
        ashar: '15:30',
        maghrib: '18:00',
        isya: '19:30'
    },
    waktuMakan: {
        sarapan: '07:00',
        makanSiang: '13:00',
        makanMalam: '19:00',
    },
    waktuBermain: '21:00'
}

// 1: buat token peserta
const token = createToken(peserta.fullName, peserta.address, peserta.contact);
console.log('Token Peserta: ', token);

// 2: verif data peserta
const decodedPeserta = verify(token);
console.log('decodedPeserta: ', decodedPeserta);

// 3: buat token jadwal
const activityToken = createTokenKegiatan(jadwalKegiatan);
console.log('Token Jadwal Kegiatan:', activityToken);

// 4: verif data jadwal
const decodedKegiatan = verify(activityToken);  
console.log('decodedKegiatan: ', decodedKegiatan);
