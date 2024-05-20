const fs = require('fs');
const axios = require('axios');

const fetchPedidos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/pedidos');
    const pedidos = response.data;
    
    fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2), 'utf-8');
    console.log('Dados dos pedidos salvos em pedidos.json');
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
  }
};

fetchPedidos();
