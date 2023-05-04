# ApiPruebaEnerclic

La API ApiPruebaEnerclic es una API desarrollada en Node.js y Express que utiliza una base de datos SQLite para interactuar con una tabla de dispositivos, donde se puede obtener información jerárquica de cada dispositivo, como su nombre, tipo y padre. La API requiere autenticación mediante un token JWT, que se debe proporcionar en el encabezado de la solicitud.

Instalación
Para instalar la API, primero se debe clonar el repositorio en su máquina local. A continuación, ejecute el siguiente comando en la línea de comandos:

Copy code
npm install
Luego, se debe crear un archivo .env en la raíz del proyecto con la variable PORT=3000. Esto es necesario para indicar en qué puerto se ejecutará la aplicación.

Finalmente, para iniciar la API, ejecute el siguiente comando en la línea de comandos:

sql
Copy code
npm start
Endpoints
La API cuenta con los siguientes endpoints:

/createUser (POST)
Este endpoint permite registrar un usuario rellenando los campos nombre, email y password encriptada con md5.

Ejemplo de solicitud:

bash
Copy code
POST /createUser

{
  "nombre": "Juan Perez",
  "email": "juan.perez@example.com",
  "password": "contraseña"
}
La respuesta es un objeto JSON con un campo "message", que indica si el usuario ha sido creado correctamente.

/login (POST)
Este endpoint permite obtener un token JWT válido para autenticarse en la API. La solicitud debe tener un cuerpo JSON con los siguientes campos:

email: El correo electrónico del usuario registrado.
password: La contraseña del usuario registrado.
Ejemplo de solicitud:

bash
Copy code
POST /login

{
  "email": "juan.perez@example.com",
  "password": "contraseña"
}
La respuesta es un objeto JSON con un campo "token", que contiene el token JWT válido para el usuario.

/getData (GET)
Este endpoint permite obtener los datos de un dispositivo específico. Primero verifica si un usuario existe en la tabla de usuarios descodificando el token que se le pasa en el encabezado con Authorization y bearer. Una vez que obtiene la respuesta si existe continua con la llamada a la tabla de dispositivos, si no existe da un error.

La respuesta es un objeto JSON que contiene los siguientes campos del dispositivo:

id: El identificador único del dispositivo.
nombre: El nombre del dispositivo.
tipo: El tipo del dispositivo.
padre: El identificador único del dispositivo padre (si lo tiene).
padre_nombre: El nombre del dispositivo padre (si lo tiene).
padre_tipo: El tipo del dispositivo padre (si lo tiene).
Ejemplo de solicitud:

vbnet
Copy code
GET /getData

Headers:
Authorization: Bearer <token>
Donde <token> es el token JWT válido para el usuario.

Notas finales
Esta API es un proyecto de ejemplo y no está destinada a ser utilizada en producción. Además, es importante destacar que la contraseña encriptada con md5 es una técnica de seguridad obsoleta y se recomienda utilizar una técnica más segura, como bcrypt.
