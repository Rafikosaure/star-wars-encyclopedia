const nodemailer = require("nodemailer");
const ENV = require("../config/config.js")
const Email = require("../models/email.model.js")
const User = require('../models/user.model.js')
const Topic = require('../models/topic.model.js')


// Envoi d'une notification par email
exports.userNotificationEmail = async (req, res) => {
    try {
        // Find the topic
        const topicId = req.params.id
        const currentTopic = await Topic.findById(topicId)

        // Find the author of the mentions / of the message
        const authorId = req.user.id
        const author = await User.findById(authorId)

        // Get the mentionned users array
        const users = req.body.users

        // Get the id of the new post
        const messageId = req.body.messageId

        // Get the type of the message
        const messageType = req.body.messageType

        // Get the page of the message
        const currentPage = req.body.currentPage

        // Get the type of the email
        const emailType = req.body.emailType

        // Build the data object
        let data = {
            users: users,
            author: author,
            topic: currentTopic,
            messageId: messageId,
            emailType: emailType,
            messageType: messageType,
            currentPage: currentPage
        }

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: ENV.EMAIL_HOST,
            port: ENV.EMAIL_PORT,
            secure: true, // use false for STARTTLS; true for SSL on port 465
            auth: {
                user: ENV.EMAIL_SENDER_ADDRESS,
                pass: ENV.GMAIL_APP_PASSWORD,
            }
        });

        // Define the email timestamp
        const dateObject = new Date()
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: '2-digit', 
            minute: '2-digit'
        }
        const datetime = dateObject.toLocaleDateString("fr-FR", options).replace(':', 'h')

        // Send emails to all mentionned users
        await Promise.all(
            data.users.map(async (userToSend) => {
                // Manage type of email
                let emailTypeToSend;
                if (data.emailType === "mention") {
                    emailTypeToSend = {
                        subject: `${userToSend.name}, on fait mention de vous !`,
                        html: Email.emailMention(data, userToSend, datetime)
                    }
                } else if (data.emailType === "newMessage") {
                    emailTypeToSend = {
                        subject: `${userToSend.name}, du nouveau dans le forum !`,
                        html: Email.emailNewMessage(data, userToSend, datetime)
                    }
                }
                const mailOptions = {
                    from: data.author.email,
                    to: userToSend.email,
                    subject: emailTypeToSend.subject, // Subject of the email
                    html: emailTypeToSend.html, // Template of the email
                    attachments: [{
                        filename: 'email-banner.jpg',
                        path: `${ENV.DEPLOYED_EXPRESS_SERVER_ENDPOINT}/images/email-banner.jpg`,
                        cid: 'starwarsencyclopediabanner' // same value cid than in the src of the html image (in the template)
                    }]
                }

                // Send email to the current user of the loop
                const email = await transporter.sendMail(mailOptions)
                console.log('Notre email :', email)
                // .then(info => console.log("Email sent !", info.response))
                // .catch(error => console.error("Error! Email sending failed!", error))
            })
        )

        res.status(200).json({
            message: "Email processing complete!"
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            message: "Email sending failed!"
        })
    }
}