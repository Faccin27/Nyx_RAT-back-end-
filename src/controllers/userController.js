const UserDAO = require("../models/dao/userDAO");
const bcrypt = require('bcrypt');

class userController {
  async register(req, reply) {
    try {
      const dataWithCreatedAt = {
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      // Hash da senha
      const hashedPassword = await bcrypt.hash(dataWithCreatedAt.pass, 10);
      dataWithCreatedAt.pass = hashedPassword;

      const newUser = await UserDAO.createUser(dataWithCreatedAt);
      reply.status(201).send(newUser);
    } catch (err) {
      if (err.message === 'Email already exists') {
        reply.status(409).send({ error: 'Email already exists' });
      } else {
        console.error(err);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async login(req, reply) {
    console.log("Requisição recebida:", req.body);
    const { email, pass } = req.body;
  
    try {
      // Verifica se o usuário existe
      const user = await UserDAO.getUserByEmail(email);
      console.log("Usuário encontrado:", user); // Log do usuário encontrado
  
      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }
  
      // Verifica se a senha está correta
      const isPasswordValid = await bcrypt.compare(pass, user.pass);
      console.log("Senha válida:", isPasswordValid); // Log da verificação da senha
  
      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }
  
      // Gera o token JWT
      const token = await reply.jwtSign({ id: user.id, email: user.email });
  
      reply.send({ token });
    } catch (error) {
      console.error("Erro durante o login:", error); // Log de erro
      reply.status(500).send({ message: 'Failed to login' });
    }
  }
  

  async getLoggedUser(req, reply) {
    const usuarioLogado = await UserDAO.getUserById(req.user.id);
    reply.send(usuarioLogado);
  }

  async getAllUsers(req, reply) {
    try {
      const users = await UserDAO.getAllUsers();
      reply.send(users);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Failed to retrieve users" });
    }
  }

  async getUserById(req, reply) {
    try {
      const userId = Number(req.params.id);
      const user = await UserDAO.getUserById(userId);

      if (user) {
        reply.send(user);
      } else {
        reply.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async createUser(req, reply) {
    try {
      const { password, ...userData } = req.body; // Extrai a senha e outros dados do usuário
  
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o número de rounds de salting
  
      // Cria um novo usuário com a senha criptografada
      const newUser = await UserDAO.createUser({ ...userData, password: hashedPassword });
  
      reply.status(201).send(newUser);
    } catch (err) {
      if (err.message === 'Email already exists') {
        reply.status(409).send({ error: 'Email already exists' });
      } else {
        console.error(err);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async updateUser(req, reply) {
    try {
      const userId = Number(req.params.id);
      const userData = req.body;

      if (userData.pass) {
        userData.pass = await bcrypt.hash(userData.pass, 10);
      }

      const updatedUser = await UserDAO.updateUser(userId, userData);
      if (updatedUser) {
        reply.send(updatedUser);
      } else {
        reply.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async deleteUser(req, reply) {
    try {
      const userId = Number(req.params.id);
      await UserDAO.deleteUser(userId);
      reply.status(204).send();
    } catch (err) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

module.exports = new userController();