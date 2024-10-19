const nodemailer = require("nodemailer");
const ENV = require("../config/config.js")
const Email = require("../models/email.model.js")
const User = require('../models/user.model.js')
const Topic = require('../models/topic.model.js')



exports.userNotificationEmail = async (req, res) => {
    try {
        // Find the topic
        const topicId = req.params.id
        const currentTopic = await Topic.findById(topicId)

        // Find the author of the mentions
        const authorId = req.user.id
        const author = await User.findById(authorId)

        // Get the mentionned users array
        const users = req.body.users

        // Get the id of the new post
        const messageId = req.body.messageId

        // Get the type of the email
        const emailType = req.body.emailType

        // Build the data object
        let data = {
            users: users,
            author: author,
            topic: currentTopic,
            messageId: messageId,
            emailType: emailType
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
                } else if (data.emailType === "newPost") {
                    emailTypeToSend = {
                        subject: `${userToSend.name}, du nouveau dans le forum !`,
                        html: Email.emailNewPost(data, userToSend, datetime)
                    }
                }
                const mailOptions = {
                    from: data.author.email,
                    to: userToSend.email,
                    subject: emailTypeToSend.subject, // Subject of the email
                    html: emailTypeToSend.html, // Template of the email
                    attachments: [{
                        filename: 'email-banner.jpg',
                        path: './images/email-banner.jpg',
                        cid: 'starwarsencyclopediabanner' // same value cid than in the src of the html image (in the template)
                    }]
                }

                // Send email to the current user of the loop
                transporter.sendMail(mailOptions)
                .then(info => console.log("Email sent !", info.response))
                .catch(error => res.status(404).json({
                    message: "Error! Email sending failed!",
                    error: error
                }))
            })
        )

        res.status(200).json({
            message: "Email processing complete!"
        })

    } catch {
        res.status(500).json({
            message: "Email sending failed!"
        })
    }
}