const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens = [];

exports.generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
    refreshTokens.push(refreshToken);
    return refreshToken;
};

exports.verifyRefreshToken = (req, res) => {
    const { token } = req.body;
    if (!token || !refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.json({ accessToken });
    });
};
