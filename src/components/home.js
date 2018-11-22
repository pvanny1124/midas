import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { Jumbotron, Grid, Row, Col, Image, Button } from "react-bootstrap";
import Auth from '../middlewares/react-auth';
import Simulator from '../simulator_components/simulator';
import "./home.css";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props =>
      this.props.location.state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
class Home extends Component {

  render() {
    return (
      <Grid>
      
        {this.props.user ? (
          <Simulator userId={this.props.user.id} />
        ) : (
          <Jumbotron>
              <h2> Do you have the Midas touch ? </h2>
              <p>
                {" "}
                Play, Learn, Win, get Bragging rights !!! 
              </p>
              <Link to="/about">
                <Button bsStyle="primary"> Click to Learn more </Button>
              </Link>
          </Jumbotron>

       
        )}
       <Row className="show-grid text-center">
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src="assets/person-1.jpg" circle className="profile-pic" />
                <h3> Frank </h3>
                <p> This is better than Robinhood </p>
              </Col>
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src="assets/person-2.jpg" circle className="profile-pic" />
                <h3> Frank </h3>
                <p> It changed my life </p>
              </Col>
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src="assets/person-3.jpg" circle className="profile-pic" />
                <h3> Frank </h3>
                <p> Best website ever </p>
              </Col>
          </Row>

         
        
      </Grid>
    );
  }
}

export default Home;