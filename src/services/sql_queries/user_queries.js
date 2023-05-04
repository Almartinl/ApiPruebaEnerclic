import md5 from "md5"; // Importa la biblioteca md5 para cifrar la contraseña
import db from "../sqlite.js"; // Importa el objeto db para interactuar con la base de datos SQLite

const userQueries = {};

// Consulta a la base de datos para buscar un usuario por correo electrónico
userQueries.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE email = ?',email, (err, rows) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(rows);
      }
    });
  });
};

// Crea un nuevo usuario en la base de datos
userQueries.createUser =  (userData) => {
  return new Promise((resolve, reject) => {
    // Se utiliza el método run para realizar la inserción de un nuevo usuario en la tabla users
    db.run(`INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)`, [userData.nombre, userData.email, md5(userData.password)], function(err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(this.lastID); // Resuelve la promesa con el ID del usuario recién creado
      }
    });
  });
};

export default userQueries; // Exporta el objeto userQueries con las funciones getUserByEmail y createUser.
