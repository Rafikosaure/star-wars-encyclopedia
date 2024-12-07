const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')
const IsMentionned = require('../models/isMentionned.model.js')
const sharp = require('sharp')
const fs = require('fs')
require('dotenv').config()
const ENV = require('../config/config.js')


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
        const path = `/images/${ref}`
        sharp(buffer).resize(450).webp().toFile(path)
        // profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
        profilePicture = `${ENV.DEPLOYED_EXPRESS_SERVER_ENDPOINT}/images/${ref}`
    }

    // Initialisation d'un nouvel utilisateur
    let userObject = {
        name: req.body.name,
        picture: profilePicture,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    }

    console.log("Notre userObject :", userObject)

    // Récupération des données de l'utilisateur initial
    let currentUserId;
    const params = req.params.id
    if (params !== 'noId') {
        currentUserId = params
    } else {
        currentUserId = req.user.id
    }
    const initialUser = await User.findById(currentUserId)
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
        const newPassword = await bcrypt.hash(userObject.password, parseInt(ENV.NB_HASH))
        userObject.password = newPassword
    }
    userObject.isAdmin = initialUser.isAdmin

    // Mise à jour des données
    const newUser = await User.findByIdAndUpdate(
        { _id: currentUserId },
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

// Suppression d'un utilisateur via son id
exports.deleteById = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
    
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    
        if (!user._id.equals(req.user.id)) {
        return res.status(403).json({
            message: "User doesn't have permission to delete another user",
        });
        }

        // Récupération de l'url de l'image de profil de l'utilisateur
        const picture = user.picture
    
        // Déconnexion : suppression du cookie
        res.clearCookie('access_token', {
            httpOnly: true,
            expires: new Date(0)
        })

        // Suppression de l'option "isMentionned"
        await IsMentionned.findOneAndDelete({ userId: id })

        // Suppression de l'utilisateur dans la base de données
        await User.findByIdAndDelete(id);

        // Suppression de l'image de profil de l'utilisateur
        if (picture !== "") {
            const filename = picture.split('/images/')[1]
            fs.unlink(`images/${filename}`, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Image obsolète supprimée !')
                }
            })
        }

        res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error in deleting user" });
    }
}

// Suppression d'un utillsateur par l'Administrateur du site
exports.authDeleteById = async (req, res) => {
    try {
        // Vérifie qu'il s'agit d'une action de l'administateur du site
        const adminId = req.user.id
        const admin = await User.findById(adminId)
        if (!admin.isAdmin) {
            return res.status(500).json({ message: "You haven't the rights for delete another user" })
        }

        // Trouve l'utilisateur à supprimer
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    
        if (!user._id.equals(id)) {
        return res.status(403).json({
            message: "User doesn't have permission to delete another user",
        });
        }

        // Récupération de l'url de l'image de profil de l'utilisateur
        const picture = user.picture

        // Suppression de l'utilisateur dans la base de données
        await User.findByIdAndDelete(id);

        // Suppression de l'image de profil de l'utilisateur
        if (picture !== "") {
            const filename = picture.split('/images/')[1]
            fs.unlink(`images/${filename}`, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Image obsolète supprimée !')
                }
            })
        }

        res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error in deleting user" });
    }
}

// Récupérer tous les utilisateurs du site
exports.getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({
            message: "Users not found"
        }))
}