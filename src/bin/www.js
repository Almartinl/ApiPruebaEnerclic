#!/usr/bin/env node

/**
 * Dependencias del módulo.
 */
import http from "http";
import app from "../index.js";

/**
 * Obtener puerto desde el ambiente y guardarlo en Express.
 */
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

/**
 * Crear servidor HTTP.
 */
const server = http.createServer(app);

/**
 * Escuchar en el puerto proporcionado, en todas las interfaces de red.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalizar un puerto en un número, string, o false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener para el evento "error" del servidor HTTP.
 */
/* eslint no-unreachable: */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // manejar errores específicos de escucha con mensajes amigables
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requiere privilegios elevados");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " ya está en uso");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener para el evento "listening" del servidor HTTP.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Escuchando en " + bind);
}
