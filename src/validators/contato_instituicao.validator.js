
const { body, param } = require("express-validator");

const validarContatoInstituicao = [
  body("id_instituicao")
    .exists({ checkFalsy: true })
    .withMessage("O ID da instituição é obrigatório!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID da instituição deve ser um número inteiro positivo")
    .toInt(),

  body("nome")
    .exists({ checkFalsy: true })
    .withMessage("O nome do contato é obrigatório!")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("O nome deve ter entre 3 e 100 caracteres"),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("O e-mail é obrigatório!")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Informe um e-mail válido"),

  body("telefone")
    .exists({ checkFalsy: true })
    .withMessage("O telefone é obrigatório!")
    .bail()
    .isLength({ min: 10, max: 11 })
    .withMessage("O telefone deve ter DDD e 10 ou 11 dígitos"),

  body("cargo")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("O cargo deve ter no máximo 100 caracteres"),
];

const validarIdContatoInstituicao = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("O ID do contato é obrigatório!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do contato deve ser um número inteiro positivo")
    .toInt(),
];

module.exports = {
  validarContatoInstituicao,
  validarIdContatoInstituicao,
};
