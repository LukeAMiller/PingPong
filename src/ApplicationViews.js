import { Route, withRouter, Redirect } from "react-router-dom"
import React, { Component } from 'react'
import auth0Client from "./Auth/Auth"
import Home from "./Home/Home"
import Callback from './Auth/Callback'
import MatchForm from './Match/MatchForm'
import Table from './PowerRank/Table'
import PieCharts from "./PowerRank/Graph"
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
                <Route exact path='/Player-Matches'component={MatchForm}/>
                <Route exact path="/Power-Rank" component={Table} />
                <Route exact path="/Player-graph" component={PieCharts}/>


            </React.Fragment>
        )
    }
}
export default ApplicationViews