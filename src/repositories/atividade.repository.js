
const { pool } = require("../config/database");

const consultaAtividade = `
  SELECT *
  FROM atividade
`;

function montarAtividade(linha) {
  return {
    id_atividade: linha.id_atividade,
    id_museu: linha.id_museu,
    id_destino: linha.id_destino,
    titulo: linha.titulo,
    descricao: linha.descricao,
    tipo_atividade: linha.tipo_atividade,
    data_inicio: linha.data_inicio,
    data_fim_prevista: linha.data_fim_prevista,
    data_fim_real: linha.data_fim_real,
    status: linha.status,
    local_externo: linha.local_externo,
    email_contato: linha.email_contato,
    telefone_contato: linha.telefone_contato
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaAtividade);
  return linhas.map(montarAtividade);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaAtividade} WHERE id_atividade = ?`,
    [id]
  );

  return linhas.length ? montarAtividade(linhas[0]) : null;
}

async function criar(atividade) {
  const sql = `
    INSERT INTO atividade (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    atividade.id_museu,
    atividade.id_destino ?? null,
    atividade.titulo,
    atividade.descricao ?? null,
    atividade.tipo_atividade,
    atividade.data_inicio,
    atividade.data_fim_prevista ?? null,
    atividade.data_fim_real ?? null,
    atividade.status,
    atividade.local_externo ?? null,
    atividade.email_contato ?? null,
    atividade.telefone_contato ?? null
  ];

  const [resultado] = await pool.query(sql, valores);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, atividade) {
  const sql = `
    UPDATE atividade
    SET
      id_museu = ?,
      id_destino = ?,
      titulo = ?,
      descricao = ?,
      tipo_atividade = ?,
      data_inicio = ?,
      data_fim_prevista = ?,
      data_fim_real = ?,
      status = ?,
      local_externo = ?,
      email_contato = ?,
      telefone_contato = ?
    WHERE id_atividade = ?
  `;

  const valores = [
    atividade.id_museu,
    atividade.id_destino ?? null,
    atividade.titulo,
    atividade.descricao ?? null,
    atividade.tipo_atividade,
    atividade.data_inicio,
    atividade.data_fim_prevista ?? null,
    atividade.data_fim_real ?? null,
    atividade.status,
    atividade.local_externo ?? null,
    atividade.email_contato ?? null,
    atividade.telefone_contato ?? null,
    id
  ];

  const [resultado] = await pool.query(sql, valores);

  if (resultado.affectedRows === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function excluir(id) {
  const [resultado] = await pool.query(
    "DELETE FROM atividade WHERE id_atividade = ?",
    [id]
  );

  return resultado.affectedRows > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};