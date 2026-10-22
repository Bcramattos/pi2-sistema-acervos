const { pool } = require("../config/database");
const consultaItemLocalizacao = "select * from item_localizacao";

function montarItemLocalizacao(linha) {
  return {
    id_localizacao: linha.id_localizacao,
    id_item: linha.id_item,
    id_sala: linha.id_sala,
    data_inicio: linha.data_inicio,
    data_fim: linha.data_fim,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaItemLocalizacao);
  return linhas.map(montarItemLocalizacao);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaItemLocalizacao} WHERE id_localizacao = ?`,
    [id],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarItemLocalizacao(linhas[0]);
}

async function criar(dadosLocalizacao) {
  const localizacao = {
    id_item: dadosLocalizacao.id_item,
    id_sala: dadosLocalizacao.id_sala,
    data_inicio: dadosLocalizacao.data_inicio,
    data_fim: dadosLocalizacao.data_fim ?? null,
  };
  const sql = "insert into item_localizacao SET ?";
  const [resultado] = await pool.query(sql, [localizacao]);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosLocalizacao) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction(); //inicia a transação
    const [resultadoLocalizacao] = await conexao.execute(
      `UPDATE item_localizacao
SET id_item=?, id_sala=?, data_inicio=?, data_fim=? WHERE id_localizacao=?`,
      [
        dadosLocalizacao.id_item,
        dadosLocalizacao.id_sala,
        dadosLocalizacao.data_inicio,
        dadosLocalizacao.data_fim ?? null,
        id,
      ],
    );

    if (resultadoLocalizacao.affectedRows === 0) {
      await conexao.rollback();
      return null;
    }
    await conexao.commit();
    return buscarPorId(id);
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM item_localizacao where id_localizacao=?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };