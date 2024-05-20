const express = require('express');
const cors = require('cors');
const connection = require('./db');
const { formatarDadosPedidos } = require('./utils/PedidoUtils');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rota para obter todos os pedidos
app.get('/pedidos', (req, res) => {
  connection.query('SELECT * FROM pedidos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do banco de dados:', err);
      res.status(500).send('Erro ao buscar dados do banco de dados');
      return;
    }

    const pedidosFormatados = formatarDadosPedidos(results);
    res.json(pedidosFormatados);
  });
});

// Rota para adicionar um novo pedido
app.post('/pedidos', (req, res) => {
  const { nome_usuario, item } = req.body;

  // Buscar o maior chat_id atual para incrementar
  connection.query('SELECT MAX(chat_id) as max_chat_id FROM pedidos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar o maior chat_id:', err);
      res.status(500).send('Erro ao buscar o maior chat_id');
      return;
    }

    const maxChatId = results[0].max_chat_id || 0;
    const chat_id = maxChatId + 1;
    const confirmado = 1;
    const hora_enviada = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO pedidos (chat_id, nome_usuario, item, hora_enviada, confirmado) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [chat_id, nome_usuario, item, hora_enviada, confirmado], (err, results) => {
      if (err) {
        console.error('Erro ao adicionar pedido ao banco de dados:', err);
        res.status(500).send('Erro ao adicionar pedido ao banco de dados');
        return;
      }
      res.status(201).send('Pedido adicionado com sucesso');
    });
  });
});

// Rota para editar um pedido existente
app.put('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const { nome_usuario, item, confirmado } = req.body;
  const query = 'UPDATE pedidos SET nome_usuario = ?, item = ?, confirmado = ? WHERE id = ?';
  connection.query(query, [nome_usuario, item, confirmado, id], (err, results) => {
    if (err) {
      console.error('Erro ao editar pedido no banco de dados:', err);
      res.status(500).send('Erro ao editar pedido no banco de dados');
      return;
    }
    res.send('Pedido editado com sucesso');
  });
});

// Rota para deletar um pedido existente
app.delete('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pedidos WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar pedido no banco de dados:', err);
      res.status(500).send('Erro ao deletar pedido no banco de dados');
      return;
    }
    res.send('Pedido deletado com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
