import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { Jumbotron, Grid, Row, Col, Image, Button } from "react-bootstrap";
import Simulator from './Simulator';
import StockInfo from './StockInfo';
import "./css/Home.css";



class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  componentWillMount(){
    //check if user is already logged in session
    fetch("/api/auth")
      .then(response => {
          console.log(response);
          return response.json();
      })
      .then(data => {
          this.props.getUser(data);
          this.setState({user: data})
          console.log(data);
      })
      .catch(error => {
          console.log(error);
      })
  }

  render() {
    return (
      <Grid>
      
        {this.state.user ? (
          <div className="user-home">
            <div className="simulator">
                <Simulator userId={this.props.user.id} />
            </div>
           <div className="stock-info">
                <StockInfo ticker="msft" />    
          </div>
           
        </div>
         
        ) : (
          <div>
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
       </div>
       
        )}
     
      
        
      </Grid>
    );
  }
}

export default Home;