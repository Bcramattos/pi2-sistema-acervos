const express = require("express");
const router = express.Router();
const itemLocalizacaoController = require("../controllers/item_localizacao.controller");
const validarResultado = require('../middleware/validarResultado')

router.get("/", itemLocalizacaoController.listar);
router.get("/:id", itemLocalizacaoController.buscarPorId);
router.post("/", itemLocalizacaoController.criar);
router.put("/:id", itemLocalizacaoController.atualizar);
router.delete("/:id", itemLocalizacaoController.remover);

module.exports = router;