const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const IsMentionned = require('../models/isMentionned.model.js')
const sharp = require('sharp')
const ENV = require('../config/config.js')



// Enregistre un nouvel utilisateur dans la base de données
exports.register = (req, res) => {
    const userObject = req.body
    let profilePicture = ""

    // Traitement de l'image mémorisée avec le module sharp
    if (req.file) {
        const { buffer, originalname } = req.file
        const timestamp = Date.now()
        const name = originalname.split(' ').join('_')
        const ref = `${name}-${timestamp}.webp`
        const path = `./images/${ref}`
        sharp(buffer).resize(450).webp().toFile(path)
        // profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
        profilePicture = `${ENV.DEPLOYED_EXPRESS_SERVER_ENDPOINT}/images/${ref}`
    }
    
    bcrypt
        .hash(userObject.password, parseInt(ENV.NB_HASH))
        .then((hash) => {
            const user = new User({
                name: userObject.name,
                picture: profilePicture,
                email: userObject.email,
                password: hash,
                isAdmin: userObject.isAdmin
            })
            user.save()
                .then(() => {
                    const isMentionned = new IsMentionned({
                        userId: user._id
                    })
                    isMentionned.save()
                    res.status(201).json({ message: 'Utilisateur créé !' })
                })
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

// Connecte un utilisateur à son compte si ses identifiants sont corrects
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                res.status(401).json({
                    message: 'Paire identifiant/mot de passe incorrecte !',
                })
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({
                                message:
                                    'Paire identifiant/mot de passe incorrecte !',
                            })
                        } else {
                            const token = jwt.sign(
                                // Charge utile du token
                                { id: user.id },
                                // Clé secrète
                                ENV.TOKEN,
                                // Options du token
                                { expiresIn: "24h" }
                            );
                            // envoi du token (cookie HTTPOnly)
                            res
                            .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "None" })
                            .status(200)
                            .json(user);
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

// Vérifie si un utilisateur est connecté
exports.logged = (req, res) => {
    User.findOne({ _id: req.user.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }))
}

// Déconnexion d'un utilisateur
exports.logout = (req, res) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({ message: 'Utilisateur déconnecté !' })
    } catch(error) {
        req.status(500).json(error)
    }
}