import notifyMentionnedUsers from "./notifyMentionnedUsers"


// Gestion des mentions
export default function mentionsManager(data, newMessageId, usersList, topicId) {

    let includedUsersArray = []
    if (usersList) {
        usersList.forEach((user) => {
            const isIncludeValue = data.search(`@${user.name}`)
            if (isIncludeValue !== -1) {
                includedUsersArray.push(user)
            }
        })
        notifyMentionnedUsers(includedUsersArray, newMessageId, topicId)
    }
}