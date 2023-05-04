import { jwtVerify } from "jose";
import { createSecretKey } from "crypto"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No se proporcionó un token de autenticación" });
      return;
    }
  
    const token = authHeader.split(" ")[1];
    const key = createSecretKey(Buffer.from("12345"));
    try {
      const decoded = jwtVerify(token, key);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token de autenticación inválido" });
    }
  };

  export default authMiddleware