
const express = require("express");
const contatoInstituicaoController = require("../controllers/contato_instituicao.controller");
const {
  validarContatoInstituicao,
} = require("../validators/contato_instituicao.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", contatoInstituicaoController.listar);
router.get("/:id", contatoInstituicaoController.buscarPorId);
router.post(
  "/",
  validarContatoInstituicao,
  validarResultado,
  contatoInstituicaoController.criar
);
router.put(
  "/:id",
  validarContatoInstituicao,
  validarResultado,
  contatoInstituicaoController.atualizar
);
router.delete("/:id", contatoInstituicaoController.remover);

module.exports = router;
