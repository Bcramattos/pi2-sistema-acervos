
const express = require("express");
const categoriaController = require("../controllers/categoria.controller");
const { validarCategoria } = require("../validators/categoria.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", categoriaController.listar);
router.get("/:id", categoriaController.buscarPorId);
router.post(
  "/",
  validarCategoria,
  validarResultado,
  categoriaController.criar
);
router.put(
  "/:id",
  validarCategoria,
  validarResultado,
  categoriaController.atualizar
);
router.delete("/:id", categoriaController.remover);

module.exports = router;
