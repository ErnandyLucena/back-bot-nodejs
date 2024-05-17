const express = require('express');
const connection = require('./db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  connection.query('SELECT * FROM pedidos', (err, results, fields) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados do banco de dados');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
