
const { body, param } = require("express-validator");

const validarAtividadeItem = [
  body("id_atividade")
    .exists({ checkFalsy: true })
    .withMessage("A atividade é obrigatória")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID da atividade deve ser um número inteiro positivo")
    .toInt(),

  body("id_item")
    .exists({ checkFalsy: true })
    .withMessage("O item do acervo é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do item deve ser um número inteiro positivo")
    .toInt(),
];

module.exports = { validarAtividadeItem };
