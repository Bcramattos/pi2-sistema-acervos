
const { body, param } = require("express-validator");

const validarItemAcervo = [
  body("titulo")
    .exists({ checkFalsy: true })
    .withMessage("O título do item é obrigatório")
    .bail()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("O título deve ter entre 2 e 150 caracteres"),


  body("ano_publicacao")
    .exists({ checkFalsy: true })
    .withMessage("O ano de publicação é obrigatório")
    .bail()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Informe um ano de publicação válido")
    .toInt(),

  body("quantidade")
    .exists({ checkFalsy: true })
    .withMessage("A quantidade é obrigatória")
    .bail()
    .isInt({ min: 0 })
    .withMessage("A quantidade deve ser um número inteiro positivo ou zero")
    .toInt(),

  body("ativo")
    .optional()
    .isBoolean()
    .withMessage("O campo ativo deve ser verdadeiro ou falso")
    .toBoolean(),
];

module.exports = { validarItemAcervo };
