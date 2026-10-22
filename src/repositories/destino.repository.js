
const { pool } = require("../config/database");

const consultaDestino = "SELECT * FROM destino";

function montarDestino(linha) {
  return {
    id_destino: linha.id_destino,
    id_instituicao: linha.id_instituicao,
    nome_local: linha.nome_local,
    endereco: linha.endereco,
    cidade: linha.cidade,
    uf: linha.uf,
    cep: linha.cep,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaDestino);
  return linhas.map(montarDestino);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaDestino} WHERE id_destino = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarDestino(linhas[0]);
}

async function criar(dadosDestino) {
  const destino = {
    id_instituicao: dadosDestino.id_instituicao,
    nome_local: dadosDestino.nome_local,
    endereco: dadosDestino.endereco,
    cidade: dadosDestino.cidade,
    uf: dadosDestino.uf,
    cep: dadosDestino.cep,
  };

  const sql = "INSERT INTO destino SET ?";
  const [resultado] = await pool.query(sql, [destino]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosDestino) {
  const sql = `
    UPDATE destino
    SET id_instituicao = ?,
        nome_local = ?,
        endereco = ?,
        cidade = ?,
        uf = ?,
        cep = ?
    WHERE id_destino = ?
  `;

  const [resultado] = await pool.execute(sql, [
    dadosDestino.id_instituicao,
    dadosDestino.nome_local,
    dadosDestino.endereco,
    dadosDestino.cidade,
    dadosDestino.uf,
    dadosDestino.cep,
    id,
  ]);

  if (resultado.affectedRows === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM destino WHERE id_destino = ?",
    [id]
  );

  return resultado.affectedRows > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};