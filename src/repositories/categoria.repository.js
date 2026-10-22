
const { pool } = require("../config/database");

const consultaCategoria = "SELECT * FROM CATEGORIA";

function montarCategoria(linha) {
  return {
    id_categoria: linha.id_categoria,
    nome: linha.nome,
    descricao: linha.descricao,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaCategoria);
  return linhas.map(montarCategoria);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaCategoria} WHERE id_categoria = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarCategoria(linhas[0]);
}

async function criar(dadosCategoria) {
  const categoria = {
    nome: dadosCategoria.nome,
    descricao: dadosCategoria.descricao ?? null,
  };

  const sql = "INSERT INTO CATEGORIA SET ?";
  const [resultado] = await pool.query(sql, [categoria]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosCategoria) {
  const conexao = await pool.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `UPDATE CATEGORIA
       SET nome = ?,
           descricao = ?
       WHERE id_categoria = ?`,
      [
        dadosCategoria.nome,
        dadosCategoria.descricao ?? null,
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
    "DELETE FROM CATEGORIA WHERE id_categoria = ?",
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
