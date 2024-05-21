const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '123456', 
  database: 'conpat'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para cadastrar um novo patrimônio
app.post('/api/patrimonios', (req, res) => {
  const { responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria} = req.body;
  const query = 'INSERT INTO patrimonios (responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Patrimônio cadastrado com sucesso');
  });
});

// Rota para obter os patrimônios cadastrados
app.get('/api/patrimonios', (req, res) => {
  const query = 'SELECT * FROM patrimonios';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
