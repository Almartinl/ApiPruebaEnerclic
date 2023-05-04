import sqlite3 from "sqlite3";

// Crea una instancia de la base de datos 'enerclic.db'
const db = new sqlite3.Database('enerclic.db', (err) => {
  // Si hay un error en la conexión, se muestra en consola
  if (err) {
    console.error(err.message);
  }
  // Si la conexión fue exitosa, se muestra en consola
  console.log('Conectado a la base de datos');
  // Muestra la ruta del archivo de la base de datos
  console.log(db.filename);
});

// Exporta la instancia de la base de datos para su uso en otros módulos
export default db;
