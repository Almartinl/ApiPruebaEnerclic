import { jwtVerify, SignJWT } from "jose";
import { createSecretKey } from "crypto";
import md5 from "md5";
import dao from "../services/dao.js";
import {
  handleErrorCreateUser,
  handleErrorLogin,
} from "../utils/handle_errors.js";

const controller = {};

// Definimos una función asíncrona llamada "createUser" que toma los parámetros "req" y "res" para poder crear usuarios.
controller.createUser = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    const user = await dao.getUserByEmail(email);

    if (user.length > 0) {
      return res.status(409).send("Usuario ya registrado");
    }

    const addUser = await dao.createUser(req.body);
    if (addUser) {
      return res.send(`Usuario ${nombre} con id: ${addUser} registrado`);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

// Definimos una función asíncrona llamada "loginUser" que toma los parámetros "req" y "res" para poder iniciar sesion con un usuario
controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await dao.getUserByEmail(email);
    if (user.length <= 0) return res.status(404).send("usuario no registrado");

    const clientPassword = md5(password);

    const [newUser] = user;

    if (newUser.password !== clientPassword)
      return res.status(401).send("Password incorrecta");
    else if (newUser.activo == 0) {
      return res.status(403).send("Usuario no activo");
    }

    const jwtConstructor = new SignJWT({
      id: newUser.id,
      email: newUser.email,
    });

    const key = createSecretKey(Buffer.from("12345"));

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(encoder.encode(key));

    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

export default controller;
