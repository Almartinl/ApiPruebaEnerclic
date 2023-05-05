import db from "../sqlite.js";

const deviceQueries = {};

// Definimos una función para obtener los datos de los dispositivos
deviceQueries.getData = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM devices", (err, rows) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(rows);
      }
    });
  });
};

export default deviceQueries;
