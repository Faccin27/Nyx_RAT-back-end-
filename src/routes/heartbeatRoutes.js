const WebSocket = require('ws');

let lastHeartbeat = null;
let heartbeatInterval = null;
const wss = new WebSocket.Server({ noServer: true });

function heartbeatRoutes(fastify, options, done) {
  fastify.post('/heartbeat', (request, reply) => {
    const currentTime = new Date();
    const status = request.body.status;

    if (!lastHeartbeat) {
      console.log(`[${currentTime.toISOString()}] Primeiro heartbeat recebido.`);
    } else {
      console.log(`[${currentTime.toISOString()}] Heartbeat recebido.`);
    }

    lastHeartbeat = currentTime;
    broadcastStatus(status);
    reply.send({ status: 'ok' });

    clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(checkHeartbeat, 10000); 
  });

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Cliente WebSocket conectado');
    
    connection.socket.on('message', message => {
      console.log('Mensagem recebida:', message.toString());
    });
    
    connection.socket.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  });

  // Expor o wss para ser usado na configuração do servidor
  fastify.decorate('wss', wss);

  done();
}

function broadcastStatus(status) {
  const message = JSON.stringify({
    type: 'status',
    data: {
      running: status === 'running',
      lastHeartbeat: lastHeartbeat.toISOString()
    }
  });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function checkHeartbeat() {
  const currentTime = new Date();
  if (lastHeartbeat && (currentTime - lastHeartbeat) > 15000) { 
    console.log(`[${currentTime.toISOString()}] Alerta: Nenhum heartbeat recebido nos últimos 15 segundos.`);
    broadcastStatus('stopped');
  }
}

module.exports = heartbeatRoutes;