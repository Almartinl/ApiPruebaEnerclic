import dao from "../services/dao.js";
import jwtDecode from "jwt-decode";

const controller = {};

controller.getData = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No se proporcionó un token de autenticación" });
    return;
  }

  const token = authHeader.split(" ")[1];
    try {
      const decoded = jwtDecode(token);
      const user = await dao.getUserByEmail(decoded.email);
      if (user.length <= 0) return res.status(404).send("usuario no registrado");
      const data = await dao.getData();
      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(400).send("Error al obtener los datos");
    }
  };

  export default controller;