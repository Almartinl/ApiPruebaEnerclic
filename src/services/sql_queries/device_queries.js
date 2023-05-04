import db from "../sqlite.js";

const deviceQueries = {};

deviceQueries.getData = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT d1.*, COALESCE(d2.nombre, "") as padre_nombre, COALESCE(d2.tipo, "") as padre_tipo FROM devices d1 LEFT JOIN devices d2 ON d1.padre = d2.id ORDER BY COALESCE(d1.padre, d1.id), d1.tipo, d1.nombre;', (err, rows) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(rows);
        }
      });
    });
  };

  export default deviceQueries