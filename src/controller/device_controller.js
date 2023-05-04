import dao from "../services/dao.js";

const controller = {};

controller.getData = async (req, res) => {
    try {
      const data = await dao.getData();
      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(400).send("Error al obtener los datos");
    }
  };

  export default controller;