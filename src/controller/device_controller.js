import dao from "../services/dao.js"; // Importamos el módulo dao desde el archivo dao.js
import jwtDecode from "jwt-decode"; // Importamos el módulo jwt-decode para decodificar el token JWT

const controller = {}; // Creamos un objeto controlador vacío

// Definimos la función getData del controlador como una función asíncrona que recibe los objetos req (solicitud) y res (respuesta) como parámetros
controller.getData = async (req, res) => {
  const authHeader = req.headers.authorization; // Obtenemos el encabezado de autenticación de la solicitud
  if (!authHeader) {
    // Si no se proporciona un encabezado de autenticación
    res
      .status(401)
      .json({ error: "No se proporcionó un token de autenticación" }); // Enviamos una respuesta de error 401 (No autorizado) y un mensaje de error
    return; // Salimos de la función
  }

  const token = authHeader.split(" ")[1]; // Obtenemos el token JWT a partir del encabezado de autenticación
  try {
    const decoded = jwtDecode(token); // Decodificamos el token JWT
    const user = await dao.getUserByEmail(decoded.email); // Buscamos al usuario en la base de datos a partir del correo electrónico codificado en el token JWT
    if (user.length <= 0) return res.status(404).send("usuario no registrado"); // Si el usuario no está registrado en la base de datos, enviamos una respuesta de error 404 (No encontrado) y un mensaje de error
    const data = await dao.getData(); // Obtenemos los datos de la base de datos utilizando el módulo dao
    res.send(data); // Enviamos los datos como respuesta de la solicitud
  } catch (e) {
    // Si ocurre un error durante la ejecución de la función try
    console.log(e);
    res.status(400).send("Error al obtener los datos");
  }
};

export default controller; // Exportamos el objeto controlador para poder utilizarlo en otros archivos del proyecto.
