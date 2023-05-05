import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormat from "ajv-formats";
import addErrors from "ajv-errors";

// Definición del esquema de validación para el DTO de Login
const LoginDtoSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El tipo de email debe ser un string",
        format: "Email debe contener un correo electrónico válido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipo de password debe de ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
  }
);

// Creación del validador
const ajv = new Ajv({ allErrors: true });
addFormat(ajv, ["email"]);
addErrors(ajv, { keepErrors: false });

// Compilación del esquema de validación
const validate = ajv.compile(LoginDtoSchema);

// Middleware que valida el DTO de Login antes de enviarlo al controlador
const validateLoginDto = (req, res, next) => {
  const isDTOValid = validate(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateLoginDto;
