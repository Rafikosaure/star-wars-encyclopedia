const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ENV = require('./config/config.js')


// Connexion à la base de données MongoDB
mongoose
    .connect(
        `mongodb+srv://${ENV.MONGODB_USER}:${ENV.MONGODB_PASSWORD}@maincluster.1a02zbk.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster`,
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Gestion des erreurs CORS
app.use(cors({
        origin: ENV.CORS_ORIGIN,
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
        max: 1000,
        message: 'Vous avez atteint la limite de 1000 requêtes par minute !',
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
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const categoryRoutes = require('./routes/category.routes')
const topicRoutes = require('./routes/topic.routes')
const commentRoutes = require('./routes/comment.routes')
const followTopicRoutes = require('./routes/followTopic.routes')
const likeRoutes = require('./routes/like.routes')
const emailRoutes = require('./routes/email.routes')
const isMentionnedRoutes = require('./routes/isMentionned.routes.js')


// Middlewares de nos routes
app.use('/translate', translateText)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/category', categoryRoutes)
app.use('/topic', topicRoutes)
app.use('/comment', commentRoutes)
app.use('/followTopic', followTopicRoutes)
app.use('/like', likeRoutes)
app.use('/email', emailRoutes)
app.use('/isMentionned', isMentionnedRoutes)
app.use('/images', cors(), express.static(path.join(__dirname, 'images')))


module.exports = app