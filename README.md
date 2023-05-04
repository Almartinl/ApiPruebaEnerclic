# ApiPruebaEnerclic

Esta API está diseñada para interactuar con una tabla de dispositivos y requiere autenticación mediante un token JWT.

Tecnologías usadas
Node.js
Express
SQLite
Endpoints
/createUser [POST]
Este endpoint registra un usuario rellenando los campos nombre, email y password encriptada con md5.

/login [POST]
Este endpoint permite obtener un token JWT válido para autenticarse en la API. La solicitud debe tener un cuerpo JSON con los siguientes campos:

email: El correo electrónico del usuario registrado.
password: La contraseña del usuario registrado.
La respuesta es un objeto JSON con un campo token, que contiene el token JWT válido para el usuario.

/getData [GET]
Este endpoint verifica si un usuario existe en la tabla de usuarios descodificando el token que se le pasa en el encabezado con Authorization y bearer. Si el usuario existe, se continúa con la llamada a la tabla de dispositivos. Si no existe, se devuelve un error.

La respuesta es un objeto JSON que contiene los siguientes campos del dispositivo:

id: El identificador único del dispositivo.
nombre: El nombre del dispositivo.
tipo: El tipo del dispositivo.
padre: El identificador único del dispositivo padre (si lo tiene).
padre_nombre: El nombre del dispositivo padre (si lo tiene).
padre_tipo: El tipo del dispositivo padre (si lo tiene).
Instalación
Clonar el repositorio
Ejecutar npm install
Crear un archivo .env con la variable PORT=3000
Ejecutar npm start
