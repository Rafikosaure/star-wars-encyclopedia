import config from '../config'


export default function subscribersManager(topicId, messageId, author, messageType) {
    
    // Récupération des abonné au topic
    fetch(`${config.serverEndpoint}/followTopic/getAllFollowersOfATopic/${topicId}`)
    .then(response => response.json())
    .then(data => {

        // Filtrer les utilisateurs (retirer l'auteur si présent)
        const subscribers = data.filter(user => user._id !== author._id)

        // Envoi des notifications aux abonnés
        if (subscribers.length > 0) {
            fetch(`${config.serverEndpoint}/email/userNotification/${topicId}`, {
                method: "POST",
                credentials: "include",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    users: subscribers,
                    emailType: "newMessage",
                    messageId: messageId,
                    messageType: messageType
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
            })
            .catch(error => console.log(error.message))
        }
    })
    .catch(error => console.log(error))
}
