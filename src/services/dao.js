
import deviceQueries from "./sql_queries/device_queries.js";
import userQueries from "./sql_queries/user_queries.js";


const dao = {};


//Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

//Añadir un nuevo usuario
dao.createUser = async (userData) => await userQueries.createUser(userData);

//Buscar usuario por Id
dao.getUserById = async (id) => await userQueries.getUserById(id);

//Obtener los datos de devices
dao.getData = async () => await deviceQueries.getData()




export default dao;
