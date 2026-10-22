
const { pool } = require("../config/database");

const consultaResponsavel = "SELECT * FROM RESPONSAVEL";

function montarResponsavel(linha) {
  return {
    id_responsavel: linha.id_responsavel,
    id_usuario: linha.id_usuario,
    cargo: linha.cargo,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaResponsavel);
  return linhas.map(montarResponsavel);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaResponsavel} WHERE id_responsavel = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarResponsavel(linhas[0]);
}

async function criar(dadosResponsavel) {
  const responsavel = {
    id_usuario: dadosResponsavel.id_usuario,
    cargo: dadosResponsavel.cargo,
  };

  const sql = "INSERT INTO RESPONSAVEL SET ?";
  const [resultado] = await pool.query(sql, [responsavel]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosResponsavel) {
  const conexao = await pool.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `UPDATE RESPONSAVEL
       SET id_usuario = ?,
           cargo = ?
       WHERE id_responsavel = ?`,
      [
        dadosResponsavel.id_usuario,
        dadosResponsavel.cargo,
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
    "DELETE FROM RESPONSAVEL WHERE id_responsavel = ?",
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
