import React, { Component } from "react";
import {withRouter , Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, } from "react-bootstrap";
import auth0Client from "../Auth/Auth";
import '../Nav/NavBar.css'
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
           {!auth0Client.isAuthenticated() ? (
             <button className="btn btn-success" onClick={auth0Client.signIn}>Sign In</button>
        ) : (
            <React.Fragment >
             <label className="Profile-Name">
                {auth0Client.getProfile().name}
              </label>
              <br/>
              <button 
                className="btn btn-danger"
                onClick={this.signOut}
              >
                Sign Out
              </button></React.Fragment>
            )}
          <h1 className="site-title">
           Welcome to Table-Tennis</h1>
<br/>
            <h3 className="sub-title">Enjoy Pinging and Ponging</h3>
          
         
          <Navbar  bg="light" expand="lg">
  <Link to="/Home">Home</Link>
  <div> &#47;&#47;  </div>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to='/Player-Matches' >New Match </Link>
<div> &#47;&#47;</div>
      <Link to="/Power-Rank"> Player-Stats</Link>
      <div>&#47;&#47;</div>
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
