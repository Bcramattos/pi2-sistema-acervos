
const { body, param } = require("express-validator");

const validarCategoria = [
  body("nome")
    .exists({ checkFalsy: true })
    .withMessage("O nome da categoria é obrigatório!")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("O nome deve ter entre 3 e 100 caracteres"),
];

const validarIdCategoria = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("O ID da categoria é obrigatório!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID da categoria deve ser um número inteiro positivo")
    .toInt(),
];

module.exports = {
  validarCategoria,
  validarIdCategoria,
};