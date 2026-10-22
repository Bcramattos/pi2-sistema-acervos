
const instituicaoRepository = require("../repositories/instituicao.repository");

async function listar(req, res, next) {
  try {
    const instituicoes = await instituicaoRepository.listar();

    return res.json({
      total: instituicoes.length,
      dados: instituicoes,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);

    const instituicao = await instituicaoRepository.buscarPorId(id);

    if (!instituicao) {
      return res.status(404).json({
        erro: "Instituição não encontrada",
      });
    }

    return res.json(instituicao);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const instituicao = await instituicaoRepository.criar(req.body);

    return res.status(201).json({
      mensagem: "Instituição cadastrada com sucesso",
      dados: instituicao,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);

    const instituicaoRemovida = await instituicaoRepository.remover(id);

    if (!instituicaoRemovida) {
      return res.status(404).json({
        erro: "Instituição não encontrada",
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

    const instituicao = await instituicaoRepository.atualizar(id, req.body);

    if (!instituicao) {
      return res.status(404).json({
        erro: "Instituição não encontrada para a alteração",
      });
    }

    return res.json({
      mensagem: "Instituição atualizada com sucesso",
      dados: instituicao,
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
