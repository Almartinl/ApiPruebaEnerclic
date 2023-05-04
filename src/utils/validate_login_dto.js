// Importación de las librerías necesarias
import { Type } from "@sinclair/typebox"; // Para definir el esquema de validación de los datos
import Ajv from "ajv"; // Para validar los datos
import addFormat from "ajv-formats"; // Para añadir el formato email
import addErrors from "ajv-errors"; // Para mejorar los mensajes de error

// Definición del esquema de validación para el DTO de Login
const LoginDtoSchema = Type.Object(
  {
    email: Type.String({
      format: "email", // Se espera que el email tenga el formato de un email
      errorMessage: {
        type: "El tipo de email debe ser un string", // Si el tipo no es string, se mostrará este mensaje
        format: "Email debe contener un correo electrónico válido", // Si el formato no es válido, se mostrará este mensaje
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipo de password debe de ser un string", // Si el tipo no es string, se mostrará este mensaje
      },
    }),
  },
  {
    additionalProperties: false, // No se permiten propiedades adicionales en el DTO
  }
);

// Creación del validador
const ajv = new Ajv({ allErrors: true }); // Se permite mostrar todos los errores de validación
addFormat(ajv, ["email"]); // Se añade el formato email al validador
addErrors(ajv, { keepErrors: false }); // Se mejora el formato de los mensajes de error

// Compilación del esquema de validación
const validate = ajv.compile(LoginDtoSchema);

// Middleware que valida el DTO de Login antes de enviarlo al controlador
const validateLoginDto = (req, res, next) => {
  const isDTOValid = validate(req.body); // Se valida el DTO enviado en el cuerpo de la petición
  if (!isDTOValid) // Si el DTO no es válido
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" })); // Se devuelve un mensaje de error con todos los errores de validación separados por línea

  next(); // Si el DTO es válido, se pasa al siguiente middleware
};

// Exportación del middleware de validación
export default validateLoginDto;
