
const express = require("express");
const responsavelController = require("../controllers/responsavel.controller");
const { validarResponsavel } = require("../validators/responsavel.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", responsavelController.listar);
router.get("/:id", responsavelController.buscarPorId);
router.post(
  "/",
  validarResponsavel,
  validarResultado,
  responsavelController.criar
);
router.put(
  "/:id",
  validarResponsavel,
  validarResultado,
  responsavelController.atualizar
);
router.delete("/:id", responsavelController.remover);

module.exports = router;
