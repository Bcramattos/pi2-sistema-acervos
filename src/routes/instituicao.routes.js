
const express = require("express");
const instituicaoController = require("../controllers/instituicao.controller");
const { validarInstituicao } = require("../validators/instituicao.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", instituicaoController.listar);
router.get("/:id", instituicaoController.buscarPorId);
router.post(
  "/",
  validarInstituicao,
  validarResultado,
  instituicaoController.criar
);
router.put(
  "/:id",
  validarInstituicao,
  validarResultado,
  instituicaoController.atualizar
);
router.delete("/:id", instituicaoController.remover);

module.exports = router;
