// Importamos la conexión a la base de datos
import db from "../sqlite.js";

// Creamos un objeto vacío para guardar las queries relacionadas con dispositivos
const deviceQueries = {};

// Definimos una función para obtener los datos de dispositivos y sus padres, si los tienen
deviceQueries.getData = () => {
  return new Promise((resolve, reject) => {
    // Ejecutamos una consulta que selecciona todas las columnas de la tabla "devices"
    // También unimos la tabla "devices" consigo misma, para obtener los nombres y tipos de los padres
    // Utilizamos COALESCE para que, en caso de que un dispositivo no tenga padre, se muestre un valor vacío en lugar de NULL
    // Finalmente, ordenamos los resultados por el id del padre (en caso de tenerlo), el tipo y el nombre del dispositivo
    db.all(
      'SELECT d1.*, COALESCE(d2.nombre, "") as padre_nombre, COALESCE(d2.tipo, "") as padre_tipo FROM devices d1 LEFT JOIN devices d2 ON d1.padre = d2.id ORDER BY COALESCE(d1.padre, d1.id), d1.tipo, d1.nombre;',
      (err, rows) => {
        if (err) {
          // Si se produce un error al ejecutar la consulta, lo rechazamos y lanzamos un error con el mensaje del error original
          reject(new Error(err.message));
        } else {
          // Si la consulta se ejecuta correctamente, resolvemos la promesa con los resultados
          resolve(rows);
        }
      }
    );
  });
};

// Exportamos el objeto "deviceQueries" para que pueda ser utilizado desde otros módulos
export default deviceQueries;
