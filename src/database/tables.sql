CREATE TABLE INSTITUICAO (
    id_instituicao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    area_atuacao VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Ativo'
);

CREATE TABLE CONTATO_INSTITUICAO (
    id_contato INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cargo VARCHAR(50),
    CONSTRAINT fk_contato_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES INSTITUICAO(id_instituicao) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DESTINO (
    id_destino INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    nome_local VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep VARCHAR(10),
    CONSTRAINT fk_destino_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES INSTITUICAO(id_instituicao) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE RESPONSAVEL (
    id_responsavel INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE CATEGORIA (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

CREATE TABLE ITEM_ACERVO (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    origem VARCHAR(100),
    data_aquisicao DATE,
    estado_conservacao VARCHAR(50),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_usuario_cadastro INT,
    CONSTRAINT fk_item_categoria FOREIGN KEY (id_categoria)
    REFERENCES CATEGORIA(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE ITEM_LOCALIZACAO (
    id_localizacao INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT NOT NULL,
    id_sala INT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME,
    CONSTRAINT fk_localizacao_item FOREIGN KEY (id_item)
        REFERENCES ITEM_ACERVO(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ATIVIDADE (
    id_atividade INT AUTO_INCREMENT PRIMARY KEY,
    id_museu INT,
    id_destino INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo_atividade VARCHAR(50),
    data_inicio DATE NOT NULL,
    data_fim_prevista DATE,
    data_fim_real DATE,
    status ENUM('Planejada', 'Em andamento', 'Concluída', 'Cancelada')
        NOT NULL DEFAULT 'Planejada',
    local_externo VARCHAR(100),
    email_contato VARCHAR(100),
    telefone_contato VARCHAR(20),
    CONSTRAINT fk_atividade_destino FOREIGN KEY (id_destino)
        REFERENCES DESTINO(id_destino)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
CREATE TABLE ATIVIDADE_ITEM (
    id_atividade INT NOT NULL,
    id_item INT NOT NULL,
    laudo_saida TEXT,
    laudo_retorno TEXT,
    PRIMARY KEY (id_atividade, id_item),
    CONSTRAINT fk_atvitem_atividade FOREIGN KEY (id_atividade)
        REFERENCES ATIVIDADE(id_atividade) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_atvitem_item FOREIGN KEY (id_item)
        REFERENCES ITEM_ACERVO(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);