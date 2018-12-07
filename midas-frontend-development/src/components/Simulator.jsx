import React, { Component } from 'react';
import ShowPortfolio from './Show-Portfolio';
import ShowCashValue from './Show-Cash-Value';
import PropTypes from 'prop-types';
import ShowPortfolioValue from './Show-Portfolio-Value';
import ReturnOnInvestment from './ReturnOnInvestment';

 //mount scoket io on top of http server
var fetch = require('isomorphic-fetch');
var io = require('socket.io-client');

/********************Configure Client Socket with the Backend Socket*****************/
const URL = "http://127.0.0.1:3000";
const socket = io(URL);

/*************************Component Configuration************************************/
class Simulator extends Component {
  constructor(props){
      super(props);
      this.state = {
        responsePrice: false,
        endpoint: "http://127.0.0.1:3000",
        value: "",
        ticker: "",
        showPortfolio: false,
        buyFailed: false,
        sellFailed: false,
        user: {},
        amountOfSharesToBuy: "",
        amountOfSharesToSell: ""
      }
  }

  static propTypes = {
    userId: PropTypes.number.isRequired
  }


  handleShowPortfolio(event){
    event.preventDefault();
    this.setState({showPortfolio: true});
  }

  handleChange(event){
      var newValue = event.target.value.toLowerCase();
    
      if(newValue == "") {
        this.setState({value: newValue, response: false}) 
      } else {
        this.setState({value: newValue});
      }
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent the form from opening another window

    //if value in input is empty...
    if(this.state.value == "") this.setState({value: "", response: false});

    //check if quote is valid...


    //get instant quote and update state
    socket.emit('get quote', this.state.value); //works
    socket.on("stock price", data => this.setState({ ticker: this.state.value, responsePrice: data }));
  }

  //Store dummy user once the component first renders using the built in componentWillMount() react function.
  componentDidMount(){
        fetch("/api/user/" + this.props.userId)
                .then((response) => {
                    return response.json();
                })
                .then((user) => {
                    this.setState({user: user});
                })
                .catch((err) => {
                  console.log(err);
                });
  }

  componentWillUnmount(){
    socket.emit("disconnect sim");
  }

  render() {
  
    var { user } = this.state;

    return (
      <div className="simulator-card card">
        <h3>{user.firstName}'s Portfolio</h3> 
        <ReturnOnInvestment startingValue={10000} endingValue={user.portfolioValue} />
        <ShowPortfolioValue user={user} portfolioValue={user.portfolioValue} />
        <ShowCashValue cashValue={user.cash} /> 
        <ShowPortfolio cashValue={parseInt(user.cash)} user={user} />
      </div>
    );
  }

}





export default Simulator;
