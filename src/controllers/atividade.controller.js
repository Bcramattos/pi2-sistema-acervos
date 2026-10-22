
const atividadeRepository = require("../repositories/atividade.repository");

async function listar(req, res) {
  try {
    const atividades = await atividadeRepository.listar();
    return res.status(200).json(atividades);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao listar atividades.",
      erro: erro.message
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const atividade = await atividadeRepository.buscarPorId(id);

    if (!atividade) {
      return res.status(404).json({
        mensagem: "Atividade não encontrada."
      });
    }

    return res.status(200).json(atividade);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao buscar atividade.",
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const {
      id_museu,
      id_destino,
      titulo,
      descricao,
      tipo_atividade,
      data_inicio,
      data_fim_prevista,
      data_fim_real,
      status,
      local_externo,
      email_contato,
      telefone_contato
    } = req.body;

    if (
      id_museu == null ||
      !titulo ||
      !tipo_atividade ||
      !data_inicio ||
      !status
    ) {
      return res.status(400).json({
        mensagem:
          "Informe os campos obrigatórios: id_museu, titulo, tipo_atividade, data_inicio e status."
      });
    }

    const atividade = await atividadeRepository.criar({
      id_museu,
      id_destino,
      titulo,
      descricao,
      tipo_atividade,
      data_inicio,
      data_fim_prevista,
      data_fim_real,
      status,
      local_externo,
      email_contato,
      telefone_contato
    });

    return res.status(201).json(atividade);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar atividade.",
      erro: erro.message
    });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;

    const atividadeExistente =
      await atividadeRepository.buscarPorId(id);

    if (!atividadeExistente) {
      return res.status(404).json({
        mensagem: "Atividade não encontrada."
      });
    }

    const dados = {
      ...atividadeExistente,
      ...req.body
    };

    const atividadeAtualizada =
      await atividadeRepository.atualizar(id, dados);

    return res.status(200).json(atividadeAtualizada);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar atividade.",
      erro: erro.message
    });
  }
}

async function excluir(req, res) {
  try {
    const { id } = req.params;

    const excluida = await atividadeRepository.excluir(id);

    if (!excluida) {
      return res.status(404).json({
        mensagem: "Atividade não encontrada."
      });
    }

    return res.status(200).json({
      mensagem: "Atividade excluída com sucesso."
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao excluir atividade.",
      erro: erro.message
    });
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};