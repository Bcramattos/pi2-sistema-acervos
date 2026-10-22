
const destinoRepository = require("../repositories/destino.repository");

async function listar(req, res, next) {
  try {
    const destinos = await destinoRepository.listar();

    return res.json({
      total: destinos.length,
      dados: destinos,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const destino = await destinoRepository.buscarPorId(id);

    if (!destino) {
      return res.status(404).json({
        erro: "Destino não encontrado",
      });
    }

    return res.json(destino);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const destino = await destinoRepository.criar(req.body);

    return res.status(201).json({
      mensagem: "Destino cadastrado com sucesso",
      dados: destino,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const destinoRemovido = await destinoRepository.remover(id);

    if (!destinoRemovido) {
      return res.status(404).json({
        erro: "Destino não encontrado",
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
    const destino = await destinoRepository.atualizar(id, req.body);

    if (!destino) {
      return res.status(404).json({
        erro: "Destino não encontrado para a alteração",
      });
    }

    return res.json({
      mensagem: "Destino atualizado com sucesso",
      dados: destino,
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