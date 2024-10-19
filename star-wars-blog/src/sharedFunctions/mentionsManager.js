import notifyMentionnedUsers from "./notifyMentionnedUsers"


// Gestion des mentions
const mentionsManager = (data, newMessageId, usersList, topicId) => {
    let includedUsersArray = []
    if (usersList) {
        usersList.forEach((user) => {
            const isIncludeValue = data.search(`@${user.name}`)
            if (isIncludeValue !== -1) {
                // console.log(`"${user}" est présent dans le texte.`)
                includedUsersArray.push(user)
            }
        })
        notifyMentionnedUsers(includedUsersArray, newMessageId, topicId)
    }
}

export default mentionsManager;