const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const sharp = require('sharp')
const fs = require('fs')
require('dotenv').config()

/** Enregistre un nouvel utilisateur dans la base de données */
exports.register = (req, res, next) => {

    /** Traitement de l'image mémorisée avec le module sharp */
    if (req.file) {
        const { buffer, originalname } = req.file
        const timestamp = Date.now()
        const name = originalname.split(' ').join('_')
        const ref = `${name}-${timestamp}.webp`
        const path = `./images/${ref}`
        sharp(buffer).resize(450).webp().toFile(path)
    }
    
    bcrypt
        .hash(req.body.password, parseInt(process.env.NB_HASH))
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                picture: req.body.picture,
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin
            })
            user.save()
                .then(() =>
                    res.status(201).json({ message: 'Utilisateur créé !' })
                )
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Connecte un utilisateur à son compte si ses identifiants sont corrects */
exports.login = (req, res, next) => {
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
                                process.env.TOKEN,
                                // Options du token
                                { expiresIn: "24h" }
                            );
                            // envoi du token (cookie HTTPOnly)
                            res
                            .cookie("access_token", token, { httpOnly: true })
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

// exports.logout = (req, res, next) => {
//     try {
//         // res.clearCookie('access_token')
//         res.status(200).json({ message: 'OK!' })
//     } catch(error) {
//         req.status(500).json({ error })
//     }
// }