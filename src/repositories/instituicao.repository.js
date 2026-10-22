
const { pool } = require("../config/database");

const consultaInstituicao = "SELECT * FROM INSTITUICAO";

function montarInstituicao(linha) {
  return {
    id_instituicao: linha.id_instituicao,
    nome: linha.nome,
    cnpj: linha.cnpj,
    area_atuacao: linha.area_atuacao,
    telefone: linha.telefone,
    email: linha.email,
    status: linha.status,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaInstituicao);
  return linhas.map(montarInstituicao);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaInstituicao} WHERE id_instituicao = ?`,
    [id]
  );

  if (linhas.length === 0) {
    return null;
  }

  return montarInstituicao(linhas[0]);
}

async function criar(dadosInstituicao) {
  const instituicao = {
    nome: dadosInstituicao.nome,
    cnpj: dadosInstituicao.cnpj,
    area_atuacao: dadosInstituicao.area_atuacao ?? null,
    telefone: dadosInstituicao.telefone ?? null,
    email: dadosInstituicao.email ?? null,
    status: dadosInstituicao.status ?? "Ativo",
  };

  const sql = "INSERT INTO INSTITUICAO SET ?";
  const [resultado] = await pool.query(sql, [instituicao]);

  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosInstituicao) {
  const conexao = await pool.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      `UPDATE INSTITUICAO
       SET nome = ?,
           cnpj = ?,
           area_atuacao = ?,
           telefone = ?,
           email = ?,
           status = ?
       WHERE id_instituicao = ?`,
      [
        dadosInstituicao.nome,
        dadosInstituicao.cnpj,
        dadosInstituicao.area_atuacao ?? null,
        dadosInstituicao.telefone ?? null,
        dadosInstituicao.email ?? null,
        dadosInstituicao.status ?? "Ativo",
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
    "DELETE FROM INSTITUICAO WHERE id_instituicao = ?",
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
