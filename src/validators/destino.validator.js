
const { body, param } = require("express-validator");

const validarDestino = [
  body("nome")
    .exists({ checkFalsy: true })
    .withMessage("O nome do destino é obrigatório!")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("O nome deve ter entre 3 e 100 caracteres"),

  body("descricao")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("A descrição deve ter no máximo 1000 caracteres"),

  body("endereco")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("O endereço deve ter no máximo 255 caracteres"),

  body("cidade")
    .exists({ checkFalsy: true })
    .withMessage("A cidade é obrigatória!")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("A cidade deve ter entre 2 e 100 caracteres"),

  body("estado")
    .optional()
    .trim()
    .isLength({ max:2 })
    .withMessage("O estado deve ter no máximo 2 caracteres"),

  body("pais")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("O país deve ter no máximo 100 caracteres"),
];

const validarIdDestino = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("O ID do destino é obrigatório!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do destino deve ser um número inteiro positivo")
    .toInt(),
];

module.exports = {
  validarDestino,
  validarIdDestino,
};
