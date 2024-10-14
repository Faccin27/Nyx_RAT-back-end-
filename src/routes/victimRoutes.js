const victimController = require('../controllers/victimController')

async function victimRoutes(fastify, options) {
    fastify.get('/',  victimController.getAllItems);
    fastify.get('/:id', victimController.getItemById);
}

module.exports = victimRoutes;