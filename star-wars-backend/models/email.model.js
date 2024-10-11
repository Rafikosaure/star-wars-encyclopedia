const ENV = require('../config/config.js')

exports.emailMention = (data, mentionnedUser, datetime) => {
    return (
        `
            <!DOCTYPE html>
            <html>
            <head>
            <title>relance</title>
            <link rel="important stylesheet" href="chrome://messagebody/skin/messageBody.css">
            </head>
            <body style="display: block; padding: 15px; max-width: 800px; min-width: 450px; width: auto;">
            <div style="width: 100%; margin-left: auto; margin-right: auto; text-align: justify;">
                <div><br><img src='cid:starwarsencyclopediabanner' style="width: 100%; min-width: 400px;"/></div><br><br>
                <div>Bonjour ${mentionnedUser.name},
                </div><br>
                <div>
                ${data.author.name} a fait mention de vous le ${datetime} dans la discussion "${data.topic.title}" !
                </div>
                <div>
                Pour prendre connaissance de son message, rendez-vous <a href='http://localhost:3000/topic/${data.topic.id}#${data.postId}'>ici</a>.
                </div>

                <br><br><br>
                <p style="font-size: 14px; text-align: center; width: 65%; margin-left: auto; margin-right: auto">Vous recevez cet email car vous êtes inscrit sur <a href='http://localhost:3000'>www.star-wars-encyclopedia.com</a>. Pour ne plus être notifié, rendez-vous dans les paramètres de <a href='http://localhost:3000/auth'>votre compte utilisateur</a>.</p>
            </div>
            </body>
            </html>
        `
    )
}