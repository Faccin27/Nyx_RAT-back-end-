const userRoutes = require('./userRoutes');
const heartbeatRoutes = require('./heartbeatRoutes');

async function router(fastify, options) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(heartbeatRoutes, { prefix: '/app' });
}

module.exports = router;