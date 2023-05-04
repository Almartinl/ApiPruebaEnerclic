import { jwtVerify, SignJWT } from "jose";
import { createSecretKey } from "crypto"
import md5 from "md5";
import dao from "../services/dao.js";


const controller = {};



controller.createUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).send("Error al recibir el body");

  try {
    const user = await dao.getUserByEmail(email);

    if (user.length > 0) return res.status(409).send("usuario ya registrado");

    const addUser = await dao.createUser(req.body);
    if (addUser)
      return res.send(`Usuario ${nombre} con id: ${addUser} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Error al recibir el body");

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
      email: newUser.email
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
  }
};



export default controller;
