
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API REST Museu",
    versao: "1.0.0",
  });
});

app.use("/api/itens-acervo", require("./routes/item_acervo.routes"));
app.use("/api/responsaveis", require("./routes/responsavel.routes"));
app.use("/api/categorias", require("./routes/categoria.routes"));
app.use("/api/instituicoes", require("./routes/instituicao.routes"));
app.use(
  "/api/contatos-instituicao",
  require("./routes/contato_instituicao.routes")
);
app.use("/api/atividades", require("./routes/atividade.routes"));
app.use("/api/atividades-item", require("./routes/atividade_item.routes"));
app.use("/api/itens-localizacao", require("./routes/item_localizacao.routes"));
app.use("/api/destinos", require("./routes/destino.routes"));


app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
  });
});

module.exports = app;
