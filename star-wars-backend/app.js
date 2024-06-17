const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Connexion à la base de données MongoDB
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@maincluster.1a02zbk.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster`,
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Gestion des erreurs CORS
app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
}))

// Utilisation du cookie-parser
app.use(cookieParser())

// Application d'un rate-limit
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 100,
        message: 'Vous avez atteint la limite de 100 requêtes par minute !',
        headers: true,
    })
)

// Configuration de Helmet
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
)


// Routes de l'application
const translateText = require('./routes/translation.routes')
const userRoutes = require('./routes/user.routes')


// Middlewares de nos routes
app.use('/translate', translateText)
app.use('/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app