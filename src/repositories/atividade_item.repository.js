const { pool } = require("../config/database");
const consultaAtividadeItem = "select * from atividade_item";

function montarAtividadeItem(linha) {
  return {
    id_atividade: linha.id_atividade,
    id_item: linha.id_item,
    laudo_saida: linha.laudo_saida,
    laudo_retorno: linha.laudo_retorno,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaAtividadeItem);
  return linhas.map(montarAtividadeItem);
}

// A chave primária é composta (id_atividade + id_item)
async function buscarPorId(id_atividade, id_item) {
  const [linhas] = await pool.query(
    `${consultaAtividadeItem} WHERE id_atividade = ? AND id_item = ?`,
    [id_atividade, id_item],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarAtividadeItem(linhas[0]);
}

async function criar(dadosAtividadeItem) {
  const atividadeItem = {
    id_atividade: dadosAtividadeItem.id_atividade,
    id_item: dadosAtividadeItem.id_item,
    laudo_saida: dadosAtividadeItem.laudo_saida ?? null,
    laudo_retorno: dadosAtividadeItem.laudo_retorno ?? null,
  };
  const sql = "insert into atividade_item SET ?";
  await pool.query(sql, [atividadeItem]);
  // não há insertId (a PK é composta), então buscamos pelos próprios ids
  return buscarPorId(atividadeItem.id_atividade, atividadeItem.id_item);
}

// Só os laudos são atualizados, pois os ids formam a chave primária
async function atualizar(id_atividade, id_item, dadosAtividadeItem) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction(); //inicia a transação
    const [resultadoAtividadeItem] = await conexao.execute(
      `UPDATE atividade_item
SET laudo_saida=?, laudo_retorno=? WHERE id_atividade=? AND id_item=?`,
      [
        dadosAtividadeItem.laudo_saida ?? null,
        dadosAtividadeItem.laudo_retorno ?? null,
        id_atividade,
        id_item,
      ],
    );

    if (resultadoAtividadeItem.affectedRows === 0) {
      await conexao.rollback();
      return null;
    }
    await conexao.commit();
    return buscarPorId(id_atividade, id_item);
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function remover(id_atividade, id_item) {
  const [resultado] = await pool.execute(
    "DELETE FROM atividade_item where id_atividade=? AND id_item=?",
    [id_atividade, id_item],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };