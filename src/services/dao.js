import deviceQueries from "./sql_queries/device_queries.js";
import userQueries from "./sql_queries/user_queries.js";

const dao = {};

// Función para buscar un usuario por su correo electrónico
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

// Función para añadir un nuevo usuario a la base de datos
dao.createUser = async (userData) => await userQueries.createUser(userData);

// Función para obtener los datos de los dispositivos
dao.getData = async () => await deviceQueries.getData();

export default dao;
