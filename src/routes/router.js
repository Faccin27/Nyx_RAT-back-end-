const userRoutes = require('./userRoutes');
const heartbeatRoutes = require('./heartbeatRoutes');
import VictimRoutes from './VictimRoutes';

async function router(fastify, options) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(heartbeatRoutes, { prefix: '/app' });
  fastify.register(VictimRoutes, {prefix: '/victim'})
}

module.exports = router;