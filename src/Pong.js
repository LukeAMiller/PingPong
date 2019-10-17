import React, { Component } from "react"
import NavBar from "./Nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth/Auth'
class Pong extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }
  render() {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    )
  }
}
export default withRouter(Pong);