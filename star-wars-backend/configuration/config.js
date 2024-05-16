import dotenv from 'dotenv'

dotenv.config()

export const env = {
    PORT: process.env.PORT,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    TOKEN: process.env.TOKEN
}