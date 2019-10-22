import React, { Component } from 'react'
import "./Table.css"
import PlayerManager from "../Modules/PlayerManager"
class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         students: [
            { Rank: 'Rank', name: 'Name', Wins: 'Wins', Losses: 'Losses', Points: "Points"},

         ],
         PlayerData:[
         ]
      }
   }
   componentDidMount() {
    (PlayerManager.getAllWithPMatches()).then(PlayerData=> {
        this.setState({
PlayerData: PlayerData
          })
    })
}
 render() {
    return (
       <div>
          <h1 id='title'>Stats</h1>
{
this.state.PlayerData.map((PlayerObject)=>{
console.log(PlayerObject)
let Wins=0, Losses=0,TotalScore=0
return (
   <tr >
      <td id='students'>
         Name: {PlayerObject.name}
      </td>
      {PlayerObject.PlayerMatches.map(individualGame => {
console.log(individualGame)
individualGame.Won? Wins++: Losses++
TotalScore= TotalScore + individualGame.UserScore
console.log(TotalScore)
// expected output: 10

          })}
<th id='students'>Wins:{Wins} </th>
      <td id='students'>Losses:{Losses}</td>
      <th id='students'>Total Points:{TotalScore}</th>
   </tr>
)
}
)}
       </div>
    )
 }
}

export default Table //exporting a component make it reusable and this is the beauty of react