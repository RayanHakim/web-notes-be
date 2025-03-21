import { Sequelize } from "sequelize";

const db = new Sequelize("notes", "root", "", {
  host: "34.28.99.134",
  dialect: "mysql",
});

export default db;
