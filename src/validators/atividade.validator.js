
const { body, param } = require("express-validator");

const statusPermitidos = [
  "Planejada",
  "Em andamento",
  "Concluída",
  "Cancelada",
];

const validarAtividade = [
  body("id_museu")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("O ID do museu deve ser um número inteiro positivo")
    .toInt(),

  body("id_destino")
    .exists({ checkFalsy: true })
    .withMessage("O destino é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O ID do destino deve ser um número inteiro positivo")
    .toInt(),

  body("titulo")
    .exists({ checkFalsy: true })
    .withMessage("O título da atividade é obrigatório")
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("O título deve ter entre 3 e 150 caracteres"),

  body("descricao")
    .optional({ nullable: true })
    .trim(),

  body("tipo_atividade")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("O tipo de atividade deve ter no máximo 50 caracteres"),

  body("data_inicio")
    .exists({ checkFalsy: true })
    .withMessage("A data de início é obrigatória")
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Informe uma data de início válida no formato AAAA-MM-DD"),

  body("data_fim_prevista")
    .optional({ nullable: true })
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("A data final prevista deve estar no formato AAAA-MM-DD"),

  body("data_fim_real")
    .optional({ nullable: true })
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("A data final real deve estar no formato AAAA-MM-DD"),

  body("status")
    .optional()
    .isIn(statusPermitidos)
    .withMessage("O status deve ser Planejada, Em andamento, Concluída ou Cancelada"),

  body("local_externo")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("O local externo deve ter no máximo 100 caracteres"),

  body("email_contato")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage("Informe um e-mail de contato válido")
    .isLength({ max: 100 })
    .withMessage("O e-mail deve ter no máximo 100 caracteres"),

  body("telefone_contato")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage("O telefone de contato deve ter no máximo 20 caracteres"),
];

module.exports = { validarAtividade };
