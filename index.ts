import fastify from 'fastify'

// Corpo da resposta
type corpoResposta = {
  status: number,
  response: string,
  body: {
    funcionando: boolean
  }
}

// Inicializar o fastify
const server = fastify()

// Rota principal(/)
server.get('/', async (request, reply) => {
  // Resposta da rota (/)
  const resposta_main: corpoResposta = {
    status: 200,
    response: "OK",
    body: {
      funcionando: true
    }
  }
  
  // Retornar as respostas
  return resposta_main
})

// Executar o servidor
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})