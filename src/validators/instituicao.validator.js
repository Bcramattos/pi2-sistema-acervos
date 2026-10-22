
const { body, param } = require("express-validator");

const validarInstituicao = [
  body("nome")
    .exists({ checkFalsy: true })
    .withMessage("O nome da instituição é obrigatório!")
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("O nome deve ter entre 3 e 150 caracteres"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Informe um e-mail válido"),

  body("telefone")
    .optional()
    .isLength({ min: 10, max: 11 })
    .withMessage("O telefone deve ter DDD e 10 ou 11 dígitos"),

  body("endereco")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("O endereço deve ter no máximo 255 caracteres"),

  body("site")
    .optional()
    .trim()
    .isURL({ require_protocol: true })
    .withMessage("Informe uma URL válida, incluindo https://"),
];

const validarIdInstituicao = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("O ID da instituição é obrigatório!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID deve ser um número inteiro positivo")
    .toInt(),
];

module.exports = {
  validarInstituicao,
  validarIdInstituicao,
};
