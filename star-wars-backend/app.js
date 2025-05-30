const express = require('express')
const app = express()
app.use(express.json())

// Modules natifs et middlewares tiers
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
// const crypto = require('crypto');
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


// Middleware pour générer un nonce unique à chaque requête
// app.use((req, res, next) => {
//     res.locals.nonce = crypto.randomBytes(16).toString('base64');
//     next();
// });


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
// Configuration de Helmet : CSP + autorisations Stripe
// app.use((req, res, next) => {
//     helmet({
//         crossOriginResourcePolicy: { policy: 'cross-origin' },
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: ["'self'"],
//                 scriptSrc: ["'self'", "https://js.stripe.com"],
//                 styleSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
//                 connectSrc: ["'self'", "https://api.stripe.com"],
//                 frameSrc: ["'self'", "https://js.stripe.com"],
//                 imgSrc: ["'self'", "data:", "https://*.stripe.com"],
//                 objectSrc: ["'none'"],
//                 baseUri: ["'self'"],
//                 formAction: ["'self'"],
//             },
//         },
//     })(req, res, next);
// });


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