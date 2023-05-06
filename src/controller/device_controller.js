import dao from "../services/dao.js";
import jwtDecode from "jwt-decode";
import { checkAuth } from "../utils/handle_errors.js";

const controller = {};

// Definimos la función getData del controlador como una función asíncrona que recibe los objetos "req" y "res" como parámetros para obtener los datos de los dispositivos y ordenarlos jerarquicamente
controller.getData = async (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwtDecode(token);
    const user = await dao.getUserByEmail(decoded.email);
    if (user.length <= 0) return res.status(404).send("usuario no registrado");
    const data = await dao.getData();

    function sortData(array) {
      let tree = {};
      let result = [];

      array.forEach((node) => {
        tree[node.numserie] = { ...node, children: [] };
      });

      array.forEach((node) => {
        if (node.padre === "NULL") {
          result.push(tree[node.numserie]);
        } else {
          tree[node.padre].children.push(tree[node.numserie]);
        }
      });

      return result;
    }

    const response = sortData(data);

    return res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default controller;
