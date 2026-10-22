
const { pool } = require("../config/database");

const consultaItemAcervo = "SELECT * FROM ITEM_ACERVO";

function montarItemAcervo(linha) {
  return {
    id_item: linha.id_item,
    id_categoria: linha.id_categoria,
    titulo: linha.titulo,
    descricao: linha.descricao,
    origem: linha.origem,
    data_aquisicao: linha.data_aquisicao,
    estado_conservacao: linha.estado_conservacao,
    data_cadastro: linha.data_cadastro,
    id_usuario_cadastro: linha.id_usuario_cadastro,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaItemAcervo);
  return linhas.map(montarItemAcervo);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaItemAcervo} WHERE id_item = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarItemAcervo(linhas[0]);
}

async function criar(dadosItem) {
  const item = {
    id_categoria: dadosItem.id_categoria,
    titulo: dadosItem.titulo,
    descricao: dadosItem.descricao ?? null,
    origem: dadosItem.origem ?? null,
    data_aquisicao: dadosItem.data_aquisicao ?? null,
    estado_conservacao: dadosItem.estado_conservacao ?? null,
    id_usuario_cadastro: dadosItem.id_usuario_cadastro ?? null,
  };

  const sql = "INSERT INTO ITEM_ACERVO SET ?";
  const [resultado] = await pool.query(sql, [item]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosItem) {
  const conexao = await pool.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `UPDATE ITEM_ACERVO
       SET id_categoria = ?,
           titulo = ?,
           descricao = ?,
           origem = ?,
           data_aquisicao = ?,
           estado_conservacao = ?,
           id_usuario_cadastro = ?
       WHERE id_item = ?`,
      [
        dadosItem.id_categoria,
        dadosItem.titulo,
        dadosItem.descricao ?? null,
        dadosItem.origem ?? null,
        dadosItem.data_aquisicao ?? null,
        dadosItem.estado_conservacao ?? null,
        dadosItem.id_usuario_cadastro ?? null,
        id,
      ]
    );

    if (resultado.affectedRows === 0) {
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
    "DELETE FROM ITEM_ACERVO WHERE id_item = ?",
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
