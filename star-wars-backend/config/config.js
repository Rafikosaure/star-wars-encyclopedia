const dotenv = require("dotenv");

dotenv.config();

const ENV = {
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    PORT: process.env.PORT,
    TOKEN: process.env.TOKEN,
    API_KEY: process.env.API_KEY,
    NB_HASH: process.env.NB_HASH,
    CORS_ORIGIN: process.env.CORS_ORIGIN
};

module.exports = ENV;