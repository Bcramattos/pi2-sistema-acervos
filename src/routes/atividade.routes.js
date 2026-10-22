
const express = require('express');
const atividadeController = require('../controllers/atividade.controller');
const { validarAtividade } = require('../validators/atividade.validator');
const validarResultado = require('../middleware/validarResultado');

const router = express.Router();

router.get('/', atividadeController.listar);
router.get('/:id', atividadeController.buscarPorId);
router.post('/', validarAtividade, validarResultado, atividadeController.criar);
router.put('/:id', validarAtividade, validarResultado, atividadeController.atualizar);
router.delete('/:id', atividadeController.excluir);

module.exports = router;