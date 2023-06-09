import md5 from "md5";
import db from "../sqlite.js";

const userQueries = {};

// Consulta a la base de datos para buscar un usuario por correo electrónico
userQueries.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users WHERE email = ?", email, (err, rows) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(rows);
      }
    });
  });
};

// Crea un nuevo usuario en la base de datos
userQueries.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)`,
      [userData.nombre, userData.email, md5(userData.password)],
      function (err) {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

export default userQueries;
