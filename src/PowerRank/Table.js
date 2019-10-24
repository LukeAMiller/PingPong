import React, { Component } from 'react'
import "./Table.css"
import PlayerManager from "../Modules/PlayerManager"
class Table extends Component {
   constructor(props) {
      // state of Player data starts as an empty array
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         PlayerData:[
         ]
      }
   }
   // pulls Playerdata from json and puts them into empty array
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
          <h1 id='title'>Stats</h1><div id="flex">
          <h3>Names</h3><h3 id="wins">Wins</h3><h3 id="losses">Losses</h3><h3>Total Points</h3></div>
{
   // maps player data and gets player objects
this.state.PlayerData.map((PlayerObject)=>{
// sets wins,losses, and score to 0
let Wins=0, Losses=0,TotalScore=0
return (<>
   <tr id="students">
      <td id='students'>
         {/* shows player name */}
        {PlayerObject.name}
      </td>
      {/* maps player matches within playerobject */}
      {PlayerObject.PlayerMatches.map(individualGame => {
// returns individual game and asks if game was won by a player or lost add 1 to wins if won and 1 to losses if lost
individualGame.Won? Wins++: Losses++
// adds each score from user to their respective total scores
TotalScore= TotalScore + individualGame.UserScore

          })}



<th id='students'>{Wins} </th>
      <td class="red"id='students'>{Losses}</td>
      <th id='students'>{TotalScore}</th>
   </tr></>
)
}
)}
     <img id="img"src="http://giphygifs.s3.amazonaws.com/media/qbrocB7FgQQUw/200.gif"></img>  </div>
    )
 }
}

export default Table //exporting a component make it reusable and this is the beauty of react