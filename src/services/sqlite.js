import sqlite3 from "sqlite3";

// Crea una instancia de la base de datos 'enerclic.db'
const db = new sqlite3.Database("enerclic.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos");

  console.log(db.filename);
});

export default db;
