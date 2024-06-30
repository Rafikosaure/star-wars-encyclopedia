const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const sharp = require('sharp')
const fs = require('fs')
require('dotenv').config()

// Enregistre un nouvel utilisateur dans la base de données
exports.register = (req, res, next) => {
    
    const userObject = req.body
    let profilePicture = ""

    // Traitement de l'image mémorisée avec le module sharp
    if (req.file) {
        const { buffer, originalname } = req.file
        console.log("Jusqu'ici tout va bien...", req.file.originalname)
        const timestamp = Date.now()
        const name = originalname.split(' ').join('_')
        const ref = `${name}-${timestamp}.webp`
        const path = `./images/${ref}`
        sharp(buffer).resize(450).webp().toFile(path)
        profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
    }
    
    bcrypt
        .hash(userObject.password, parseInt(process.env.NB_HASH))
        .then((hash) => {
            const user = new User({
                name: userObject.name,
                picture: profilePicture,
                email: userObject.email,
                password: hash,
                isAdmin: userObject.isAdmin
            })
            user.save()
                .then(() =>
                    res.status(201).json({ message: 'Utilisateur créé !' })
                )
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

// Connecte un utilisateur à son compte si ses identifiants sont corrects
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

// Vérifie si un utilisateur est connecté
exports.logged = (req, res, next) => {
    User.findOne({ _id: req.user.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }))
}

// Déconnexion d'un utilisateur
exports.logout = (req, res, next) => {
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

// Modification des données d'un utilisateur
exports.modifyUser = async (req, res) => {

    // Création d'une variable pour l'URL de l'image de profil
    let profilePicture = ""

    // Deux possibilités : la requête contient un fichier image ou non
    if (req.file) {
        // Traitement de l'image avec le module sharp
        const { buffer, originalname } = req.file
        const timestamp = Date.now()
        const name = originalname.split(' ').join('_')
        const ref = `${name}-${timestamp}.webp`
        const path = `./images/${ref}`
        sharp(buffer).resize(450).webp().toFile(path)
        profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
    }

    // Initialisation d'un nouvel utilisateur
    let userObject = {
        name: req.body.name,
        picture: profilePicture,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    }
    
    // Récupération des données de l'utilisateur initial
    const initialUser = await User.findById(req.user.id)
    if (!initialUser) {
        res.status(404).json({
            message: "User not found!"
        })
    }

    // Filtre des données non-renseignées
    if (userObject.name === "") {
        userObject.name = initialUser.name
    }
    if (userObject.email === "") {
        userObject.email = initialUser.email
    }
    if (userObject.picture === "") {
        userObject.picture = initialUser.picture
    }
    if (userObject.password === "") {
        userObject.password = initialUser.password
    } else {
        const newPassword = await bcrypt.hash(userObject.password, parseInt(process.env.NB_HASH))
        userObject.password = newPassword
    }
    userObject.isAdmin = initialUser.isAdmin
    
    // Mise à jour des données
    const newUser = await User.findByIdAndUpdate(
        { _id: req.user.id },
        userObject,
        { new: true }
    )
    if (!newUser) {
        res.status(500).json({
            message: "Data update failed!"
        })
    }

    // Suppression de l'image obsolète si une nouvelle image a été chargée
    if (req.file && initialUser.picture !== "") {
        const filename = initialUser.picture.split('/images/')[1]
        fs.unlink(`images/${filename}`, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Image obsolète supprimée !')
            }
        })
    }
    
    // Envoi de l'utilisateur mis à jour dans la réponse
    res.status(200).json(newUser)
}







    // // Trouver les données de l'utilisateur à mettre à jour
    // if (checkIsExiste) {
    //     User.findById(req.user.id)
    //     .then(data => {
    //         const initialUser = data

            
    //         if (userObject.password === "") {
    //             console.log("Champ mot de passe vide :", userObject.password)
    //             userObject.password = initialUser.password
    //             // console.log("Si pas de mise à jour du password :", userObject.password)
    //         }
    //         // ici
    //                 console.log('Nouveau mot de passe :', userObject.password)
    //                 console.log('Nouvel User avant enregistrement :', userObject)
    //                 // Mise à jour des données
    //                 User.findByIdAndUpdate(
    //                     { _id: req.user.id }, 
    //                     userObject,
    //                     { new: true }
    //                 )
    //                 .then(user => {
    //                     console.log('Nouvel User après mise à jour :', user)
    //                     res.status(200).json(user)
    //                     // Suppression de l'image obsolète si une nouvelle image a été chargée
    //                     if (req.file) {
    //                         const filename = initialUser.picture.split('/images/')[1]
    //                         fs.unlink(`images/${filename}`, (err) => {
    //                             if (err) {
    //                                 console.log(err)
    //                             } else {
    //                                 console.log('Image obsolète supprimée !')
    //                             }
    //                         })
    //                     }
    //                     })
    //                 .catch((error) => res.status(500).json(error))
    //             })
    //             .catch(error => console.log(error))
    //         }
    //     })
    //     .catch(error => res.status(404).json(error))
    // } else {
    //     res.status(404).json({
    //         message: "User not found!"
    //     })
    // }