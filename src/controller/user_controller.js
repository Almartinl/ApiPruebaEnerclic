import { jwtVerify, SignJWT } from "jose"; // Importamos las funciones `jwtVerify` y `SignJWT` del paquete "jose"
import { createSecretKey } from "crypto"; // Importamos la función `createSecretKey` del paquete "crypto"
import md5 from "md5"; // Importamos la función `md5` del paquete "md5"
import dao from "../services/dao.js"; // Importamos el módulo `dao` desde el archivo "../services/dao.js"

const controller = {}; // Creamos un objeto llamado "controller"

// Definimos una función asíncrona llamada "createUser" que toma los parámetros "req" y "res"
controller.createUser = async (req, res) => {
  const { nombre, email, password } = req.body; // Extraemos los valores de "nombre", "email" y "password" desde el cuerpo de la solicitud (req.body)
  if (!nombre || !email || !password)
    // Si alguno de los valores extraídos es falso, devolvemos un error de solicitud incorrecta con el código de estado 400
    return res.status(400).send("Error al recibir el body");

  try {
    const user = await dao.getUserByEmail(email); // Buscamos al usuario por su correo electrónico en la base de datos utilizando la función "getUserByEmail" del módulo "dao"

    if (user.length > 0) return res.status(409).send("usuario ya registrado"); // Si encontramos un usuario en la base de datos con el mismo correo electrónico, devolvemos un error de conflicto con el código de estado 409

    const addUser = await dao.createUser(req.body); // Si no se encuentra ningún usuario en la base de datos con el mismo correo electrónico, creamos un nuevo usuario utilizando la función "createUser" del módulo "dao" con los valores extraídos del cuerpo de la solicitud (req.body)
    if (addUser)
      return res.send(`Usuario ${nombre} con id: ${addUser} registrado`); // Si el nuevo usuario se crea correctamente, devolvemos un mensaje de respuesta con el nombre del usuario y su identificador único
  } catch (e) {
    console.log(e.message); // Si se produce algún error al buscar o crear el usuario, imprimimos el mensaje de error en la consola
  }
};

// Definimos una función asíncrona llamada "loginUser" que toma los parámetros "req" y "res"
controller.loginUser = async (req, res) => {
  const { email, password } = req.body; // Extraemos los valores de "email" y "password" desde el cuerpo de la solicitud (req.body)

  if (!email || !password)
    // Si alguno de los valores extraídos es falso, devolvemos un error de solicitud incorrecta con el código de estado 400
    return res.status(400).send("Error al recibir el body");

  try {
    let user = await dao.getUserByEmail(email); // Buscamos al usuario por su correo electrónico en la base de datos utilizando la función "getUserByEmail" del módulo "dao"
    if (user.length <= 0) return res.status(404).send("usuario no registrado"); // Si no encontramos al usuario en la base de datos, devolvemos un error de usuario no encontrado con el código de estado 404

    const clientPassword = md5(password); // Hasheamos la contraseña

    // Se asigna el primer elemento del array user a la variable newUser, utilizando la sintaxis de destructuración
    const [newUser] = user;

    // Se verifica si la contraseña proporcionada por el usuario coincide con la contraseña almacenada en la base de datos para el usuario correspondiente
    if (newUser.password !== clientPassword)
      return res.status(401).send("Password incorrecta");
    // Si el usuario no está activo, se devuelve una respuesta de error con estado 403
    else if (newUser.activo == 0) {
      return res.status(403).send("Usuario no activo");
    }

    // Se crea un objeto SignJWT con los datos del usuario que se utilizarán para generar el token JWT
    const jwtConstructor = new SignJWT({
      id: newUser.id,
      email: newUser.email,
    });

    // Se crea una clave secreta utilizando la función createSecretKey de la biblioteca crypto y se convierte a un objeto Buffer
    const key = createSecretKey(Buffer.from("12345"));

    // Se crea un objeto TextEncoder para codificar la clave secreta como UTF-8
    const encoder = new TextEncoder();

    // Se genera el token JWT y se almacena en la variable jwt utilizando los métodos encadenados del objeto jwtConstructor, se especifica el algoritmo de encriptación, el tiempo de expiración del token y se firma utilizando la clave secreta
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(encoder.encode(key));

    // Se devuelve el token JWT en una respuesta exitosa
    return res.send({ jwt });
  } catch (e) {
    console.log(e.message); // Si se produce algún error imprimimos el mensaje de error en la consola
  }
};

// Exportar el controlador
export default controller;
