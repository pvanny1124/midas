import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Autocomplete from './Autocomplete';
import { connect } from 'react-redux';
import { getAllSymbols } from '../actions/actionCreators';

// import "../../public/styles/style.css";

const mapStateToProps = state => {
  return  {
    currentUser: state.currentUser,
    isAuthenticated: state.currentUser.isAuthenticated,
    suggestions: state.suggestions,
    stocksFound: state.stocksFound
  }
}

class CustomNavbar extends Component {

  componentDidMount(){
      //load the stocks from IEX
      this.props.dispatch(getAllSymbols());
  }
 
  render() {
    console.log(this.props.suggestions)
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> Midas </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Nav className="search">
          {/* <Search getTicker={(ticker) => this.props.getTicker(ticker)}/> */}
          <Autocomplete forceUpdate={() => this.forceUpdate} className="search-bar" suggestions={this.props.suggestions} getTicker={(ticker) => this.props.getTicker(ticker)}/>
        </Nav>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            {this.props.isAuthenticated ? (
                <NavItem eventKey={2}
                        componentClass={Link}
                        href="/profile"
                        to="/profile"
                >
                    Profile
                </NavItem>
            ) : (
              <NavItem eventKey={2} componentClass={Link} href="/login" to="/login">
                Login
              </NavItem>
            )}
          
            
            {this.props.isAuthenticated ? (
                <NavItem eventKey={3} componentClass={Link} href="/signout" to="/signout">
                  Signout
                </NavItem>
            ) : (
              <NavItem eventKey={3} componentClass={Link} href="/signup" to="/signup">
               Signup
              </NavItem>
            )}

          <NavItem eventKey={5} componentClass={Link} href="/leaderboards" to="/leaderboards" >Leaderboards</NavItem>
            
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, null)(CustomNavbar);