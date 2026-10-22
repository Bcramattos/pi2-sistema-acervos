const express = require("express");
const router = express.Router();
const atividadeItemController = require("../controllers/atividade_item.controller")
const validarResultado = require('../middleware/validarResultado')

router.get("/", atividadeItemController.listar);
router.get("/:id_atividade/:id_item", atividadeItemController.buscarPorId);
router.post("/", atividadeItemController.criar);
router.put("/:id_atividade/:id_item", atividadeItemController.atualizar);
router.delete("/:id_atividade/:id_item", atividadeItemController.remover);

module.exports = router;