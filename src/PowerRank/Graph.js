import PieChart from 'react-minimal-pie-chart';
import React, { Component } from 'react'
import PlayerManager from '../Modules/PlayerManager'
class PieCharts extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            PlayerData: []
        }
    }
    componentDidMount() {
        (PlayerManager.getAllWithPMatches()).then(PlayerData => {
            this.setState({
                PlayerData: PlayerData
            })
        })
    }
    renderPieChart(Won,Loss){
    return(   <PieChart
        data={[
            { title: 'One', value: Loss, color: 'red' },
            { title: 'Three', value: Won, color: 'green' },
        ]}/>)
    }
    render() {
        return (<div><h1>Wins/Losses</h1>
            {this.state.PlayerData.map((PlayerObject) => {
                let Wins=0, Losses=0;
                    if (PlayerObject.id ===+sessionStorage.getItem("credentials")){

                PlayerObject.PlayerMatches.map(individualGame => {
                    individualGame.Won? Wins++: Losses++;


                }

               )
               return(<><h3>{PlayerObject.name}</h3>
                <h5>Green:Wins</h5>
                <h5>Red:Losses</h5>
                <div>{this.renderPieChart(Wins,Losses)}</div>
               </>
                    )
              }
                           else {return (null)}
})}

</div>
            )
    }}
export default PieCharts