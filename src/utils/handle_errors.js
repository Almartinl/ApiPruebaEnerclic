//Funcion que comprueba si existe nombre, email o password
export const handleErrorCreateUser = (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send("Error al recibir el body");
  }

  next();
};

//Funcion que comprueba si existe email o password
export const handleErrorLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Error al recibir el body");
  }

  next();
};

//Funcion que comprueba si existe token en "req.headers"
export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .json({ error: "No se proporcionó un token de autenticación" });
    return;
  }
  next();
};
