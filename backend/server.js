const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, cpf TEXT, password TEXT)`);
  }
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
