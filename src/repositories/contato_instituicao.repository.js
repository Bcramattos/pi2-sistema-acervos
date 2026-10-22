
const { pool } = require("../config/database");

const consultaContatoInstituicao = "SELECT * FROM CONTATO_INSTITUICAO";

function montarContatoInstituicao(linha) {
  return {
    id_contato: linha.id_contato,
    id_instituicao: linha.id_instituicao,
    nome: linha.nome,
    telefone: linha.telefone,
    email: linha.email,
    cargo: linha.cargo,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaContatoInstituicao);
  return linhas.map(montarContatoInstituicao);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaContatoInstituicao} WHERE id_contato = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarContatoInstituicao(linhas[0]);
}

async function criar(dadosContato) {
  const contato = {
    id_instituicao: dadosContato.id_instituicao,
    nome: dadosContato.nome,
    telefone: dadosContato.telefone ?? null,
    email: dadosContato.email ?? null,
    cargo: dadosContato.cargo ?? null,
  };

  const sql = "INSERT INTO CONTATO_INSTITUICAO SET ?";
  const [resultado] = await pool.query(sql, [contato]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosContato) {
  const conexao = await pool.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `UPDATE CONTATO_INSTITUICAO
       SET id_instituicao = ?,
           nome = ?,
           telefone = ?,
           email = ?,
           cargo = ?
       WHERE id_contato = ?`,
      [
        dadosContato.id_instituicao,
        dadosContato.nome,
        dadosContato.telefone ?? null,
        dadosContato.email ?? null,
        dadosContato.cargo ?? null,
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
    "DELETE FROM CONTATO_INSTITUICAO WHERE id_contato = ?",
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
