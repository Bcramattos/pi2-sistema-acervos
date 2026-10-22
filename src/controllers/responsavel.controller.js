
const responsavelRepository = require("../repositories/responsavel.repository");

async function listar(req, res, next) {
  try {
    const responsaveis = await responsavelRepository.listar();

    return res.json({
      total: responsaveis.length,
      dados: responsaveis,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);

    const responsavel = await responsavelRepository.buscarPorId(id);

    if (!responsavel) {
      return res.status(404).json({
        erro: "Responsável não encontrado",
      });
    }

    return res.json(responsavel);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const responsavel = await responsavelRepository.criar(req.body);

    return res.status(201).json({
      mensagem: "Responsável cadastrado com sucesso",
      dados: responsavel,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);

    const responsavelRemovido = await responsavelRepository.remover(id);

    if (!responsavelRemovido) {
      return res.status(404).json({
        erro: "Responsável não encontrado",
      });
    }

    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);

    const responsavel = await responsavelRepository.atualizar(id, req.body);

    if (!responsavel) {
      return res.status(404).json({
        erro: "Responsável não encontrado para a alteração",
      });
    }

    return res.json({
      mensagem: "Responsável atualizado com sucesso",
      dados: responsavel,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  remover,
  atualizar,
};
