const remoteURL = "http://localhost:4321"
export default {
    getAll() {
        return fetch(`${remoteURL}/Players`).then(result => result.json())
      },
       getAllWithPMatches() {
        return fetch(`${remoteURL}/Players?_embed=PlayerMatches`).then(result => result.json())
      },
get(id) {
    return fetch(`${remoteURL}/Players/${id}`).then(result => result.json())
  },
  post(newPlayer) {
    return fetch(`${remoteURL}/Players`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlayer)
    }).then(data => data.json())}}