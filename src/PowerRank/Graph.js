import PieChart from 'react-minimal-pie-chart';
import React, { Component } from 'react'
import PlayerManager from '../Modules/PlayerManager'
import './Graph.css'
import PlayerMatchManager from '../Modules/PlayerMatchManager'
import { func } from 'prop-types';
// Pie Charts class to be exported to Application views
class PieCharts extends Component {
    constructor(props) {
        super(props)
        //since we are extending class Table so we have to use super in order to override Component class constructor
        // Player Data is empty array
        this.state = { //state is by default an object
            PlayerData: [],
            Matches: []
        }
    }
    // gets all players with every match that each player has played in and puts the data into the empty array
    componentDidMount() {
        (PlayerManager.getAllWithPMatches()).then(PlayerData => {
            this.setState({
                PlayerData: PlayerData
            })
        });
        (PlayerMatchManager.getAllwithMatches()).then(Matches => {
            this.setState({
                Matches: Matches
            })
        }

        )
    }
    // render pie chart function that accepts two parameters of Won and loss as values of pie chart gets pie chart from react
    renderPieChart(Won, Loss) {
        return (<PieChart
            data={[
                { title: 'One', value: Loss, color: 'red' },
                { title: 'Three', value: Won, color: 'green' },
            ]} />)
    }
    render() {

        return (<div><h1>Wins/Losses</h1>
            {/* maps PlayerData and gets PlayerObject and sets wins and losses to 0 */}
            {this.state.PlayerData.map((PlayerObject) => {
                console.log(PlayerObject)
                let date = []
                this.state.Matches.map((match) => {
                    match.PlayerId === PlayerObject.id ?
                        date.push(match.Match.date) : console.log(null)

                })
                let Wins = 0, Losses = 0;

                PlayerObject.PlayerMatches.map(individualGame => {
                    // if an individual game is won then 1 is added to Wins and if its false then 1 is added to Losses
                    individualGame.Won ? Wins++ : Losses++
                });
                // returns Player names, total wins,losses, win percentage, and a pie chart representing each players win/loss percentage
                return (<div id="flex"><h3>Player: {PlayerObject.name}</h3>
                    <h5>Last Played: {date[0]}</h5>
                    <h5 id="green">Green: Total Wins: {Wins}</h5>
                    <h5 id="red">Red: Total Losses: {Losses}</h5>
                    <h3>Win-Percentage: {Wins / (Wins + Losses) * 100}</h3>
                    <div id="graph">{this.renderPieChart(Wins, Losses)}</div>
                </div>
                )
            })}

        </div>
        )
    }
}
export default PieCharts