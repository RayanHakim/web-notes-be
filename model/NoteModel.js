import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "note"
const Note = db.define(
  "note", // Nama Tabel
  {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  },
  {
    freezeTableName: true,
    createdAt: "tanggal_buat",
    updatedAt: "tanggal_ubah"
  }
);

db.sync().then(() => console.log("Database synced"));

export default Note;
