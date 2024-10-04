async function authenticate(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
  
  module.exports = authenticate;