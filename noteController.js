const db = require('./database');

exports.getNotes = (req, res) => {
    db.query("SELECT * FROM note", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.addNote = (req, res) => {
    const { title, content } = req.body;
    const now = new Date();
    db.query(
        "INSERT INTO note (title, content, tanggal_buat, tanggal_ubah) VALUES (?, ?, ?, ?)",
        [title, content, now, now],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Catatan berhasil ditambahkan");
        }
    );
};
