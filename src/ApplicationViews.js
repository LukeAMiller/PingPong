import { Route, withRouter, Redirect } from "react-router-dom"
import React, { Component } from 'react'
import auth0Client from "./Auth/Auth"
import Home from "./Home/Home"
import Callback from './Auth/Callback'
import MatchForm from './Match/MatchForm'
import PlayerForm from './Player/PlayerForm'
import Table from './PowerRank/Table'
class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    if (auth0Client.isAuthenticated()) {
                        return <Home />
                    } else {
                        auth0Client.signIn();
                        return null;
                    }
                }} /><Route exact path="/callback" component={Callback} />
                <Route exact path="/Home" component={Home} />
                <Route path="/Players/new" render={(props) => {
                    return <PlayerForm {...props} />
                }} />
                <Route exact path='/Player-Matches'component={MatchForm}/>
                <Route exact path="/Power-Rank" component={Table} />
            </React.Fragment>
        )
    }
}
export default ApplicationViews