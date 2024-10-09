require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true,  
};

const jwtOptions = {
  secret: process.env.JWT_SECRET, 
  sign: { expiresIn: '1h' },      
};

module.exports = {
  corsOptions,
  jwtOptions
};
