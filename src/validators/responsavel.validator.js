
const { body, param } = require("express-validator");

const validarResponsavel = [
  body("id_usuario")
    .exists({ checkFalsy: true })
    .withMessage("O usuário é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do usuário deve ser um número inteiro positivo")
    .toInt(),

  body("cargo")
    .trim()
    .notEmpty()
    .withMessage("O cargo é obrigatório")
    .bail()
    .isLength({ max: 50 })
    .withMessage("O cargo deve ter no máximo 50 caracteres"),
];

module.exports = { validarResponsavel };