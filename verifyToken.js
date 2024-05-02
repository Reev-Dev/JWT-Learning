const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5tYWUiOiJSaWZhaSIsImtlbGFzIjoiWEkiLCJpYXQiOjE3MTQ2MzMxNTR9.g4yaVHHD-1lWk-5EvJjEF-jKgttS_SroXVsNl2bW9ys';
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) throw err;
    else console.log('Token valid'); console.log(decoded);
})

