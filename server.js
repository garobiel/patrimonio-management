const express = require('express'); // Importando o módulo Express, que é um framework web para Node.js
const mysql = require('mysql2'); // Importando o módulo mysql2 para se conectar ao banco de dados MySQL
const bodyParser = require('body-parser'); // Middleware para fazer parsing do corpo das requisições HTTP
const cors = require('cors'); // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)

const app = express(); // Inicializando o aplicativo Express
app.use(bodyParser.json()); // Usando o bodyParser para fazer parsing de JSON nas requisições
app.use(cors()); // Habilitando o CORS no aplicativo

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost', // Endereço do host do banco de dados MySQL
  user: 'root', // Nome de usuário do banco de dados
  password: 'Amoskate123*', // Senha do banco de dados
  database: 'conpatfront' // Nome do banco de dados
});

// Conectar ao banco de dados e verificar/criar tabela
db.connect(err => {
  if (err) {
    throw err; // Lança um erro se houver falha na conexão com o banco de dados
  }
  console.log('Conectado ao banco de dados MySQL'); // Mensagem de sucesso ao conectar ao banco de dados

  // Verificar se a tabela "patrimonios" existe no banco de dados
  const checkTableQuery = `
    SELECT COUNT(*) AS count 
    FROM information_schema.tables 
    WHERE table_schema = 'conpatfront' 
    AND table_name = 'patrimonios'
  `;

  db.query(checkTableQuery, (err, results) => {
    if (err) {
      console.error('Erro ao verificar a existência da tabela:', err); // Mensagem de erro se a verificação da tabela falhar
      return;
    }

    const tableExists = results[0].count > 0; // Verifica se a tabela existe com base no resultado da consulta
    if (!tableExists) {
      // Criar a tabela "patrimonios" se ela não existir
      const createTableQuery = `
        CREATE TABLE patrimonios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          responsavel VARCHAR(255),
          usuario VARCHAR(255),
          dataCadastro DATE,
          matricula VARCHAR(6),
          modelo VARCHAR(255),
          movimentacao VARCHAR(255),
          secretaria VARCHAR(255)
        )
      `;
      db.query(createTableQuery, err => {
        if (err) {
          console.error('Erro ao criar a tabela:', err); // Mensagem de erro se a criação da tabela falhar
          return;
        }
        console.log('Tabela "patrimonios" criada com sucesso.'); // Mensagem de sucesso ao criar a tabela
      });
    } else {
      console.log('Tabela "patrimonios" já existe.'); // Mensagem se a tabela já existir no banco de dados
    }
  });
});

// Rota para cadastrar um novo patrimônio
app.post('/api/patrimonios', (req, res) => {
  const { responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria } = req.body; // Extrai dados do corpo da requisição
  const query = 'INSERT INTO patrimonios (responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria) VALUES (?, ?, ?, ?, ?, ?, ?)'; // Consulta SQL para inserir dados na tabela
  db.query(query, [responsavel, usuario, dataCadastro, matricula, modelo, movimentacao, secretaria], (err, result) => {
    if (err) {
      return res.status(500).send(err); // Retorna erro 500 se houver erro na consulta SQL
    }
    res.send('Patrimônio cadastrado com sucesso'); // Retorna mensagem de sucesso se o patrimônio for cadastrado com sucesso
  });
});

// Rota para obter os patrimônios cadastrados
app.get('/api/patrimonios', (req, res) => {
  const query = 'SELECT * FROM patrimonios'; // Consulta SQL para selecionar todos os patrimônios na tabela
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err); // Retorna erro 500 se houver erro na consulta SQL
    }
    res.json(results); // Retorna os resultados da consulta em formato JSON
  });
});

// Iniciar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Mensagem de sucesso ao iniciar o servidor
});
