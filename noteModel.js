const db = require('./database');

exports.findUserByUsername = (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

exports.addUser = (username, hashedPassword, callback) => {
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], callback);
};
