const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { obterRecursosPorUserId } = require('../services/recursosUserIdService');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('C:/Programacao/ProjetosJavaScript/ShareHood/backend/db/data.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');

    // Criação das tabelas após a conexão ser estabelecida
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      cpf TEXT, 
      password TEXT,
      nome TEXT,
      email TEXT
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela users', err);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS enderecos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      userId INTEGER,
      cep TEXT, 
      estado TEXT, 
      cidade TEXT, 
      bairro TEXT, 
      logradouro TEXT, 
      numero TEXT, 
      complemento TEXT,
      nomeCondominio TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela enderecos', err);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS recursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      userId INTEGER, 
      nome TEXT, 
      descricao TEXT, 
      imagem TEXT, 
      disponivel BOOLEAN,
      FOREIGN KEY (userId) REFERENCES users (id)
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela recursos', err);
      }
    });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Rota de autenticação
app.post('/login', (req, res) => {
  const { cpf, password } = req.body;

  db.get('SELECT * FROM users WHERE cpf = ? AND password = ?', [cpf, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json({ message: 'Login bem-sucedido', user: row });
    } else {
      res.status(401).json({ message: 'CPF ou senha inválidos' });
    }
  });
});

// Rota de cadastro de usuário
app.post('/cadastro-usuario', (req, res) => {
  const { cpf, password, nome, email } = req.body;

  db.run(`INSERT INTO users (cpf, password, nome, email) VALUES (?, ?, ?, ?)`, [cpf, password, nome, email], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', userId: this.lastID });
  });
});

// Rota de cadastro de endereço
app.post('/cadastro-endereco', (req, res) => {
  const { userId, cep, estado, cidade, bairro, logradouro, numero, complemento, nomeCondominio } = req.body;

  db.run(`INSERT INTO enderecos (userId, cep, estado, cidade, bairro, logradouro, numero, complemento, nomeCondominio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [userId, cep, estado, cidade, bairro, logradouro, numero, complemento, nomeCondominio], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
  });
});

// Rota de cadastro de recurso
app.post('/cadastro-recurso', (req, res) => {
  const { userId, nome, descricao, imagem, disponivel } = req.body;

  db.run(
    `INSERT INTO recursos (userId, nome, descricao, imagem, disponivel) VALUES (?, ?, ?, ?, ?)`,
    [userId, nome, descricao, imagem, disponivel],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Recurso cadastrado com sucesso', recursoId: this.lastID });
    }
  );
});

// Rota de resgate de recurso
app.get('/recursos/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Lógica para pegar os recursos de um banco de dados ou memória
    const recursos = await obterRecursosPorUserId(userId);
    res.json(recursos);  // Retorne os recursos para o cliente
  } catch (error) {
    console.error('Erro ao buscar recursos:', error);
    res.status(500).json({ error: 'Erro ao buscar recursos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
