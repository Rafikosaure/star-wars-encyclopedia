const express = require('express')
const app = express()
app.use(express.json())

// Modules natifs et middlewares tiers
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


// Helmet HSTS -> si mode production, obliger l'accès au site via HTTPS
if (ENV.NODE_ENV === 'production') {
    app.use(helmet.hsts({ maxAge: 31536000 })); // Durée : 1 an en secondes
}


// Configuration de Helmet
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
)


// Gestion des erreurs CORS
app.use(cors({
        origin: ENV.CLIENT_ENDPOINT,
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


// Routes de l'application
const translateText = require('./routes/translation.routes.js')
const authRoutes = require('./routes/auth.routes.js')
const userRoutes = require('./routes/user.routes.js')
const postRoutes = require('./routes/post.routes.js')
const categoryRoutes = require('./routes/category.routes.js')
const topicRoutes = require('./routes/topic.routes.js')
const commentRoutes = require('./routes/comment.routes.js')
const followTopicRoutes = require('./routes/followTopic.routes.js')
const likeRoutes = require('./routes/like.routes.js')
const emailRoutes = require('./routes/email.routes.js')
const isMentionnedRoutes = require('./routes/isMentionned.routes.js')
const shoppingRoutes = require('./routes/shopping.routes.js')


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
app.use('/shopping', shoppingRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app