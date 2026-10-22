
const express = require("express");
const destinoController = require("../controllers/destino.controller");
const { validarDestino } = require("../validators/destino.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", destinoController.listar);
router.get("/:id", destinoController.buscarPorId);
router.post(
  "/",
  validarDestino,
  validarResultado,
  destinoController.criar
);
router.put(
  "/:id",
  validarDestino,
  validarResultado,
  destinoController.atualizar
);
router.delete("/:id", destinoController.remover);

module.exports = router;