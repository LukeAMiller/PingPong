import React, { Component } from "react";
import {withRouter , Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, } from "react-bootstrap";
import auth0Client from "../Auth/Auth";
class NavBar extends Component {
  signOut = () => {
    auth0Client.signOut();
    sessionStorage.clear()
    this.props.history.replace("/");
  };
    // method to change link color upon active link
    changeLinkColor = pathname => {
      if (pathname === this.props.location.pathname) {
        return "nav-link enabled";
      } else {
        return "nav-link";
      }
    };



    render() {
      return (
        <header>
          <h1 className="site-title">
           Welcome to Table-Tennis
            <br />
            <small>Pong for a Ping</small>
          </h1>
          {!auth0Client.isAuthenticated() ? (
              <button className="btn btn-success" onClick={auth0Client.signIn}>Sign In</button>
        ) : (
            <React.Fragment>
             <label>
                {auth0Client.getProfile().name}
              </label>
              <button
                className="btn btn-danger"
                onClick={this.signOut}
              >
                Sign Out
              </button></React.Fragment>
            )}
          <Navbar bg="light" expand="lg">
  <Link to="/Home">Home</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to='/Player-Matches' >New Match </Link>

      <Link to="/Power-Rank"> Power-Ranking</Link>
      <Link to= '/Player-graph'>Player-Graph
      </Link>
         </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    </Form> */}
  </Navbar.Collapse>
</Navbar>
        </header>
      );
    }
  }
  export default withRouter(NavBar);
