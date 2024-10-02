require('dotenv').config();
const Fastify = require('fastify');
const fastify = Fastify();
const axios = require('axios');
const cors = require('@fastify/cors');

// Configura CORS
fastify.register(cors, {
  origin: process.env.FRONTEND_URL, 
  credentials: true
});

// Esta rota deve verificar se o aplicativo esta rodando no computador da vitima.
fastify.get('/api/check-app', async (request, reply) => {
  try {
    // Faz uma requisição para o servidor Python
    const response = await axios.get(`${process.env.PYTHON_SERVER}/check-app`);
    return response.data;
  } catch (error) {
    return reply.status(500).send({ error: 'Nyx não ativo.' });
  }
});

// Inicia o servidor
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
