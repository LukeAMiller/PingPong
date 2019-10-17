const remoteURL = "http://localhost:4321"
export default {
get(id) {
    return fetch(`${remoteURL}/PlayerMatches/${id}?_expand=Player`).then(result => result.json())
  },
  getAll(){
      return fetch(`${remoteURL}/PlayerMatches?_expand=Player`).then(result=> result.json())
  },
  post(newMatch) {
    return fetch(`${remoteURL}/PlayerMatches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMatch)
    }).then(data => data.json())},}