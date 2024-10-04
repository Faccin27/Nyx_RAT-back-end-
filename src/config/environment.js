require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Permitir o front-end acessar o back-end
  credentials: true,  // Permitir cookies
};

const jwtOptions = {
  secret: process.env.JWT_SECRET, 
  sign: { expiresIn: '1h' },      
};

module.exports = {
  corsOptions,
  jwtOptions
};
