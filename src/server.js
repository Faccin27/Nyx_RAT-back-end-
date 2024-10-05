require('dotenv').config();
const Fastify = require('fastify');
const fastify = Fastify();
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const router = require('./routes/router');
const { corsOptions, jwtOptions } = require('./config/environment');

// Configurar CORS
fastify.register(cors, corsOptions);

// Registrar o plugin JWT
fastify.register(jwt, jwtOptions);

// Registrar rotas
fastify.register(router);

// Iniciar o servidor
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