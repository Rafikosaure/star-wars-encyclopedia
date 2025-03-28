const dotenv = require("dotenv");

dotenv.config();

const ENV = {
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    TOKEN: process.env.TOKEN,
    API_KEY: process.env.API_KEY,
    NB_HASH: process.env.NB_HASH,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,
    SENDER_NAME: process.env.SENDER_NAME,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
    CLIENT_PORT: process.env.CLIENT_PORT,
    DEPLOYED_EXPRESS_SERVER_ENDPOINT: process.env.DEPLOYED_EXPRESS_SERVER_ENDPOINT
};

module.exports = ENV;