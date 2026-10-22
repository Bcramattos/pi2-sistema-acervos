
const express = require("express");
const itemAcervoController = require("../controllers/item_acervo.controller");
const { validarItemAcervo } = require("../validators/item_acervo.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", itemAcervoController.listar);
router.get("/:id", itemAcervoController.buscarPorId);
router.post(
  "/",
  validarItemAcervo,
  validarResultado,
  itemAcervoController.criar
);
router.put(
  "/:id",
  validarItemAcervo,
  validarResultado,
  itemAcervoController.atualizar
);
router.delete("/:id", itemAcervoController.remover);

module.exports = router;
