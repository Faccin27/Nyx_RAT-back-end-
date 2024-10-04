const axios = require('axios');

async function appRoutes(fastify, options) {
  fastify.get('/check-app', async (request, reply) => {
    try {
      const response = await axios.get(`${process.env.PYTHON_SERVER}/check-app`);
      return response.data;
    } catch (error) {
      return reply.status(500).send({ error: 'Nyx não ativo.' });
    }
  });
}

module.exports = appRoutes;