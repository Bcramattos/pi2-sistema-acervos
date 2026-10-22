
const { body, param } = require("express-validator");

const validarItemLocalizacao = [
  body("id_item")
    .exists({ checkFalsy: true })
    .withMessage("O item do acervo é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do item deve ser um número inteiro positivo")
    .toInt(),

  body("id_sala")
    .exists({ checkFalsy: true })
    .withMessage("A sala é obrigatória")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID da sala deve ser um número inteiro positivo")
    .toInt(),

  body("data_inicio")
    .exists({ checkFalsy: true })
    .withMessage("A data de início é obrigatória")
    .bail()
    .isISO8601()
    .withMessage("Informe uma data de início válida")
    .toDate(),

  body("data_fim")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Informe uma data final válida")
    .toDate(),
];

module.exports = { validarItemLocalizacao };
