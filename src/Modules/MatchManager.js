const remoteURL = "http://localhost:4321"
export default {
get(id) {
    return fetch(`${remoteURL}/Matches/${id}`).then(result => result.json())
  },
  getAll(){
      return fetch(`${remoteURL}/Matches`).then(result=> result.json())
  },
  post(newMatch) {
    return fetch(`${remoteURL}/Matches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMatch)
    }).then(data => data.json())},}