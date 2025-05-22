const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('dotenv').config();

const { getNotes, addNote } = require('./noteController');
const { generateRefreshToken, verifyRefreshToken } = require('./refreshToken');
const verifyToken = require('./verifyToken');
const userModel = require('./noteModel');

router.get('/', (req, res) => {
    res.send('Halo, ini halaman utama!');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        userModel.addUser(username, hash, (err) => {
            if (err) return res.status(500).send("Username sudah digunakan.");
            res.send("Registrasi berhasil!");
        });
    } catch (error) {
        res.status(500).send("Terjadi kesalahan server.");
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.findUserByUsername(username, async (err, user) => {
        if (err || !user) return res.status(401).send("User tidak ditemukan");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).send("Password salah");

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET, // Eh benar kan ya masalahnya disini
            { expiresIn: '15m' }
        );
        const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
        res.json({ accessToken, refreshToken });
    });
});

router.post('/token', verifyRefreshToken);
router.get('/notes', verifyToken, getNotes);
router.post('/notes', verifyToken, addNote);

module.exports = router;
