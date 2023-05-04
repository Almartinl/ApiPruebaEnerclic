# ApiPruebaEnerclic

Esta API utiliza Node.js, Express y SQLite para permitir interactuar con una tabla de dispositivos. Se pueden obtener información jerárquica de cada dispositivo, como su nombre, tipo y padre. La API requiere autenticación mediante un token JWT, que se debe proporcionar en el encabezado de la solicitud.

## Endpoints

### `api/user/createUser` (POST)

Este endpoint registra un usuario rellenando los campos `nombre`, `email` y `password` encriptada con md5.

### `api/user/login` (POST)

Este endpoint permite obtener un token JWT válido para autenticarse en la API. La solicitud debe tener un cuerpo JSON con los siguientes campos:
- `email`: El correo electrónico del usuario registrado.
- `password`: La contraseña del usuario registrado.

La respuesta es un objeto JSON con un campo `token`, que contiene el token JWT válido para el usuario.

### `api/device/getData` (GET)

Este endpoint primero verifica si un usuario existe en la tabla de usuarios descodificando el token que se le pasa en el encabezado con Authorization y bearer. Una vez que obtiene la respuesta si existe, continúa con la llamada a la tabla de dispositivos. Si no existe, da un error.

La respuesta es un objeto JSON que contiene los siguientes campos del dispositivo:
- `id`: El identificador único del dispositivo.
- `nombre`: El nombre del dispositivo.
- `tipo`: El tipo del dispositivo.
- `padre`: El identificador único del dispositivo padre (si lo tiene).
- `padre_nombre`: El nombre del dispositivo padre (si lo tiene).
- `padre_tipo`: El tipo del dispositivo padre (si lo tiene).

## Instalación

Hay dos formas de instalar y ejecutar esta API.

### 1. Instalación local

Para instalar la API localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto y ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` en la raíz del proyecto y agrega la variable `PORT=3000`.
4. Ejecuta `npm start` para iniciar el servidor.

### 2. Instalación con Docker

Para instalar y ejecutar la API con Docker, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta `docker build -t apipruebaenerclic .` para construir la imagen de Docker.
4. Ejecuta `docker run -p 3000:3000 apipruebaenerclic` para iniciar el contenedor.

## Exportación de Postman

La carpeta `endpointsPostman` en la raíz del repositorio contiene un archivo `.json` que contiene la colección de Postman exportada. Puedes importar este archivo en tu cliente de Postman para probar los endpints.
