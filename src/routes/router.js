const userRoutes = require('./routes/userRoutes');
const appRoutes = require('./routes/appRoutes');

async function router(fastify, options) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(appRoutes, { prefix: '/app' });
}

module.exports = router;