import React, { Component } from 'react';
import PlayerMatchManager from '../Modules/PlayerMatchManager'
import '../Match/MatchForm.css'
import PlayerManager from '../Modules/PlayerManager'
import MatchManager from '../Modules/MatchManager'
import moment from 'moment';

//match form to be saved once the user types in and selects data
class MatchForm extends Component {
    state = {
        UserScore: "",
        OpponentScore: "",
        PlayerId:"",
        MatchId:"",
        Won: "",
        loadingStatus: false,
        Players: [],
    };
    handleFieldChange = evt => {
        console.log(evt.target)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    /*  Local method for validation, set loadingStatus, create Match      object, invoke the MatchMana
    ger post method, and redirect to the full Match list
    */
   //gets all players and sets state
    componentDidMount() {
        (PlayerManager.getAllWithPMatches()).then(Player => {
            this.setState({
                Players: Player
            })
        })
    }


    constructNewMatch = evt => {
        evt.preventDefault();
        var Match ={
            date: moment().format('llll')
        }
         MatchManager.post(Match)
         .then(postedMatch=>{


        //conditional to alert if a field is empty
        if (this.state.OpponentScore === "" || this.state.UserScore === ""|| this.state.PlayerId === "") {
            window.alert("Please input an Opponent and Scores");
        } else {
            this.setState({ loadingStatus: true });
            //conditional to determine winner and loser
            if (+this.state.UserScore > +this.state.OpponentScore) {
//post playermatch with Users Id
                var PlayerMatch = {
                    UserScore: +this.state.UserScore,
                    PlayerId: +sessionStorage.getItem("credentials"),
                    MatchId: postedMatch.id,
                    Won: true
                }
                //posts opponent match with opponent id
                var OpponentMatch ={
UserScore:+this.state.OpponentScore,
MatchId: postedMatch.id,
PlayerId: +this.state.PlayerId,
Won: false
                }
                window.alert("Winner!")
            } else {
                var PlayerMatch = {
                    UserScore: +this.state.UserScore,
                    MatchId: postedMatch.id,
                    PlayerId: +sessionStorage.getItem("credentials"),
                    Won: false
                }
                var OpponentMatch ={
                    UserScore:+this.state.OpponentScore,
                    MatchId: postedMatch.id,
                    PlayerId: +this.state.PlayerId,
                    Won: true
                                    }
                window.alert("You Lose...")
            };
            // Create the Match and redirect user to Match list
            PlayerMatchManager.post(OpponentMatch).then(() =>
            PlayerMatchManager.post(PlayerMatch))
                .then(() => this.props.history.push("/Home"));
        } })
    };
    render() {
        return (

            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input type="text"
                                required onChange={this.handleFieldChange}
                                id="UserScore"
                                placeholder="UserScore" />


                            <label>Opponent</label>
                            <select
                                className="form-control"
                                id="PlayerId"
                                value={this.state.id}
                                onChange={this.handleFieldChange}>
                                    <option >Choose an Opponent</option>
                                {this.state.Players.map(Player=> {
                                    let Wins=0,Losses=0;
                                    Player.PlayerMatches.map(individualGame => {
                                        individualGame.Won? Wins++: Losses++;})
                                    return Player.id === +sessionStorage.getItem("credentials") ? "" :
                                        <option  key={Player.id} value={Player.id}>
                                            {Player.name} wins:{Wins/(Wins +Losses)*100}%
                                        </option>
                                })}</select>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="OpponentScore"
                                placeholder="OpponentScore" />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewMatch}
                            >Submit</button>
                        </div>

                    </fieldset>
                </form>
            </>
        )
    }
}
export default MatchForm