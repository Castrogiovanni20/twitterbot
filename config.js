const dotenv = require('dotenv').config();

if (dotenv.error && dotenv.error.code == 'ENOENT') {
  throw 'Falta archivo .env';
}

module.exports = {
  //  CONFIG VARIABLES
  API_KEY: process.env.API_KEY,
  API_SECRET_KEY: process.env.API_SECRET_KEY,
  BEARER_TOKEN: process.env.BEARER_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ACCES_TOKEN_SECRET: process.env.ACCES_TOKEN_SECRET
};