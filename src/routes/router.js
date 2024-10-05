const userRoutes = require('./userRoutes');
const appRoutes = require('./appRoutes');

async function router(fastify, options) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(appRoutes, { prefix: '/app' });
}

module.exports = router;