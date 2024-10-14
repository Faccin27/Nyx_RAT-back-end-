require('dotenv').config();
import Fastify from "fastify";
import fetch from 'node-fetch';

class victimController {

    async getAllItems(req, reply) {
        try {
            // Envia requisição para o servidor Python
            const response = await fetch(`${process.env.PYTHON_SERVER}/get-all`);
            const data = await response.json();
            // Após receber o JSON, envia para o front-end
            reply.send(data);
        } catch (error) {
            // Trata o erro ao buscar o servidor Python
            reply.status(500).send({ error: 'Erro ao buscar o servidor Python' });
        }
    }

    async getItemById(req, reply) {
        const { id } = req.params; // Captura o ID dos parâmetros da requisição
        try {
            // Envia requisição ao servidor Python com o ID
            const response = await fetch(`${process.env.PYTHON_SERVER}/get-item/${id}`);
            const data = await response.json();

            // Envia o item específico para o front-end
            if (data) {
                reply.send(data);
            } else {
                reply.status(404).send({ error: 'Item não encontrado' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar o servidor Python' });
        }
    }



}

module.exports = new victimController();