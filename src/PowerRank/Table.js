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
    (PlayerManager.getAllWithPMatches()).then(PlayerData=> { console.log(PlayerData)
        this.setState({

PlayerData: PlayerData
          })
    })
}
   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div>
            <h1>Power-Rank</h1>
         </div>
      )
   }
   renderTableData() {
    return this.state.students.map((student, index) => {
       const { Rank, name, Wins, Losses, Points } = student //destructuring
       return (
          <tr key={Rank}>
             <td>{name}</td>
             <td>{Rank}</td>
             <td>{Wins}</td>
             <td>{Losses}</td>
             <td>{Points}</td>
          </tr>
       )
    })
 }

 render() {
    return (
       <div>
          <h1 id='title'>Power Rank</h1>
          <table id='students'>
             <tbody>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}

export default Table //exporting a component make it reusable and this is the beauty of react