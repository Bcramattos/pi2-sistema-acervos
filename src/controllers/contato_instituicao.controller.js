
const contatoInstituicaoRepository = require("../repositories/contato_instituicao.repository");

async function listar(req, res, next) {
  try {
    const contatos = await contatoInstituicaoRepository.listar();

    return res.json({
      total: contatos.length,
      dados: contatos,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);

    const contato = await contatoInstituicaoRepository.buscarPorId(id);

    if (!contato) {
      return res.status(404).json({
        erro: "Contato da instituição não encontrado",
      });
    }

    return res.json(contato);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const contato = await contatoInstituicaoRepository.criar(req.body);

    return res.status(201).json({
      mensagem: "Contato da instituição cadastrado com sucesso",
      dados: contato,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);

    const contatoRemovido = await contatoInstituicaoRepository.remover(id);

    if (!contatoRemovido) {
      return res.status(404).json({
        erro: "Contato da instituição não encontrado",
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

    const contato = await contatoInstituicaoRepository.atualizar(
      id,
      req.body
    );

    if (!contato) {
      return res.status(404).json({
        erro: "Contato da instituição não encontrado para a alteração",
      });
    }

    return res.json({
      mensagem: "Contato da instituição atualizado com sucesso",
      dados: contato,
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
