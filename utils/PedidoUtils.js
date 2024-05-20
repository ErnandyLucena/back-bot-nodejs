const saboresEspeciais = {
  1: 'Mussarela',
  2: 'Calabresa',
  3: 'Margherita',
  4: 'Pepperoni'
};

function formatarDadosPedidos(pedidos) {
  return pedidos.map(pedido => ({
    id: pedido.id,
    chat_id: pedido.chat_id,
    nome_usuario: pedido.nome_usuario,
    sabor: mapearCodigoParaSabor(pedido.item),
    hora_enviada: pedido.hora_enviada,
    confirmado: pedido.confirmado
  }));
}

function mapearCodigoParaSabor(codigo) {
  if (saboresEspeciais[codigo]) {
    return saboresEspeciais[codigo];
  } else {
    return 'Desconhecido';
  }
}

module.exports = {
  formatarDadosPedidos,
  mapearCodigoParaSabor
};
