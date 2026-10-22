const atividadeItemRepository = require("../repositories/atividade_item.repository");

// Valida os ids que formam a chave primária composta
function idsValidos(id_atividade, id_item) {
  return (
    Number.isInteger(id_atividade) &&
    id_atividade > 0 &&
    Number.isInteger(id_item) &&
    id_item > 0
  );
}

async function listar(req, res, next) {
  try {
    const atividadeItens = await atividadeItemRepository.listar();
    return res.json({
      total: atividadeItens.length,
      dados: atividadeItens,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id_atividade = Number(req.params.id_atividade); //pegamos os ids enviados
    const id_item = Number(req.params.id_item);
    if (!idsValidos(id_atividade, id_item)) {
      return res.status(400).json({
        erro: "id_atividade e id_item devem ser números válidos",
      });
    }
    const atividadeItem = await atividadeItemRepository.buscarPorId(
      id_atividade,
      id_item,
    );
    if (!atividadeItem) {
      return res.status(404).json({
        erro: "Item da atividade não encontrado",
      });
    }
    return res.json(atividadeItem);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const id_atividade = Number(req.body.id_atividade);
    const id_item = Number(req.body.id_item);
    if (!idsValidos(id_atividade, id_item)) {
      return res.status(400).json({
        erro: "Os campos id_atividade e id_item são obrigatórios e devem ser números válidos",
      });
    }
    const atividadeItem = await atividadeItemRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Item vinculado à atividade com sucesso",
      dados: atividadeItem,
    });
  } catch (erro) {
    // chave primária composta repetida: o item já está vinculado a essa atividade
    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        erro: "Este item já está vinculado a esta atividade",
      });
    }
    return next(erro); //encaminha o erro para 'frente', para o próximo
  }
}

async function remover(req, res, next) {
  try {
    const id_atividade = Number(req.params.id_atividade);
    const id_item = Number(req.params.id_item);
    if (!idsValidos(id_atividade, id_item)) {
      return res.status(400).json({
        erro: "id_atividade e id_item devem ser números válidos",
      });
    }
    const atividadeItemRemovido = await atividadeItemRepository.remover(
      id_atividade,
      id_item,
    );
    if (!atividadeItemRemovido) {
      return res.status(404).json({
        erro: "Item da atividade não encontrado",
      });
    }
    return res.status(204).send(); //No Content
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id_atividade = Number(req.params.id_atividade);
    const id_item = Number(req.params.id_item);
    if (!idsValidos(id_atividade, id_item)) {
      return res.status(400).json({
        erro: "id_atividade e id_item devem ser números válidos",
      });
    }
    const atividadeItem = await atividadeItemRepository.atualizar(
      id_atividade,
      id_item,
      req.body,
    );
    if (!atividadeItem) {
      return res.status(404).json({
        erro: "Item da atividade não encontrado para a alteração",
      });
    }
    return res.json({
      mensagem: "Item da atividade atualizado com sucesso",
      dados: atividadeItem,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };