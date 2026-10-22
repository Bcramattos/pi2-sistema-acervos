const itemLocalizacaoRepository = require("../repositories/item_localizacao.repository");

function validarCampos(body, parcial = false) {
  const { id_item, id_sala, data_inicio, data_fim } = body;

  if (!parcial) {
    if (!id_item || !id_sala || !data_inicio) {
      return "Os campos id_item, id_sala e data_inicio são obrigatórios";
    }
  }

  if (id_item !== undefined && Number.isNaN(Number(id_item))) {
    return "id_item deve ser um número";
  }

  if (id_sala !== undefined && Number.isNaN(Number(id_sala))) {
    return "id_sala deve ser um número";
  }

  if (data_inicio !== undefined && Number.isNaN(Date.parse(data_inicio))) {
    return "data_inicio inválida";
  }

  if (data_fim !== undefined && data_fim !== null) {
    if (Number.isNaN(Date.parse(data_fim))) {
      return "data_fim inválida";
    }
    if (data_inicio && Date.parse(data_fim) < Date.parse(data_inicio)) {
      return "data_fim não pode ser anterior a data_inicio";
    }
  }

  return null;
}

async function listar(req, res, next) {
  try {
    const localizacoes = await itemLocalizacaoRepository.listar();
    return res.json({
      total: localizacoes.length,
      dados: localizacoes,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "id inválido",
      });
    }
    const localizacao = await itemLocalizacaoRepository.buscarPorId(id);
    if (!localizacao) {
      return res.status(404).json({
        erro: "Localização do item não encontrada",
      });
    }
    return res.json(localizacao);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const erroValidacao = validarCampos(req.body);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }
    const localizacao = await itemLocalizacaoRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Localização do item cadastrada com sucesso",
      dados: localizacao,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "id inválido",
      });
    }
    const localizacaoRemovida = await itemLocalizacaoRepository.remover(id);
    if (!localizacaoRemovida) {
      return res.status(404).json({
        erro: "Localização do item não encontrada",
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
    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "id inválido",
      });
    }
    const erroValidacao = validarCampos(req.body, true);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }
    const localizacao = await itemLocalizacaoRepository.atualizar(id, req.body);
    if (!localizacao) {
      return res.status(404).json({
        erro: "Localização do item não encontrada para a alteração",
      });
    }
    return res.json({
      mensagem: "Localização do item atualizada com sucesso",
      dados: localizacao,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };