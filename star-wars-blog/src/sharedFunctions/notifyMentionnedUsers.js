import config from "../config";


// Envoi des notifications en cas de mention
const notifyMentionnedUsers = async (usersToNotify, messageId, topicId) => {
        
    // Vérification si les mentions sont autorisées
    const promises = usersToNotify.map(async (userToNotify) => {
        const response = await fetch(`${config.serverEndpoint}/isMentionned/getIsMentionnedOption/${userToNotify._id}`, { credentials: 'include' });
        const allowMentionObject = response.json()
        const result = await allowMentionObject
        if (result.allowMentions) {
            return userToNotify
        } else {
            return undefined
        }
    });
    const allowedUsers = await Promise.all(promises);

    // Filtrer les utilisateurs
    const filteredUsers = allowedUsers.filter(user => user !== undefined)

    // Envoi des notifications aux utilisateurs concernés
    if (allowedUsers.length > 0) {
        fetch(`${config.serverEndpoint}/email/userNotification/${topicId}`, {
            method: "POST",
            credentials: "include",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                users: filteredUsers,
                emailType: "mention",
                messageId: messageId
            })
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.log(error.message))
    }
}

export default notifyMentionnedUsers;