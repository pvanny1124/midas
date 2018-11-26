//Implements buying and selling a stock on a /stocks/<ticker> page

import React, { Component } from 'react';
import { getStockPrice } from '../helpers/interactions/iex_interactions';
import { updateUserPortfolio } from '../helpers/interactions/user_interactions';

//First, the trade component needs to have the user informartion.
class Trade extends Component {
    constructor(props){
        super(props);
        this.state = {
            amountOfSharesToBuy: null,
            amountOfSharesToSell: null,
            user: this.props.user,
            tickerData: this.props.tickerData
        }
    }

    handleBuyChange(event){
        //need to do this to access event.target.value through handleBuy/handleSell
        this.setState({amountOfSharesToBuy: event.target.value});
    }
  
    handleSellChange(event){
      this.setState({amountOfSharesToSell: event.target.value});
    }

    handleSell(event){
        event.preventDefault();
        
        var { responsePrice, ticker, amountOfSharesToSell, user, sellResponse, value } = this.state;
  
        if(value == "" || amountOfSharesToSell == "") return;
  
        getStockPrice(ticker)
          .then((price) => {
              //if the user doesnt own stocks...
              if(isEmpty(user.portfolio)){
                this.setState({sellFailed: true});
              } else {
                      //check if the user has the stock 
                      if(user.portfolio.hasOwnProperty(ticker)){
                        //Check if he/she has more than or equal to x amount of shares to sell
                            var userOwnedShares = parseInt(user.portfolio[ticker].shares);
  
                            if(userOwnedShares >= parseInt(amountOfSharesToSell)){
                                  //remove x amount of shares from ticker object in portfolio
                                  user.portfolio[ticker].shares = parseInt(userOwnedShares) - parseInt(amountOfSharesToSell);
  
                                  //add price x amount of shares to cash    
                                  user.cash = parseInt(user.cash) + (parseInt(amountOfSharesToSell) * parseInt(price));
  
                                  //Update user Portfolio on backend
                                  updateUserPortfolio(user)
                                    .catch((err) => {console.log(err)});
  
                                  //Update component for client
                                  this.setState({user: user, sellFailed: false});
                            } else {
                              this.setState({sellFailed: true});
                            }
                      }                          
             
             }
          });
    }

    render(){
        console.log(this.state.user);
        console.log(this.state.tickerData);
        return (
            <div className="form-container">
                    {/*Buy button*/}
                    <form onSubmit={(event) => this.handleBuy(event)}>
                        <input type="text" placeholder="x amount of shares" onChange={(event) => this.handleBuyChange(event)}/>
                        <input type="submit" value="Buy" />
                    </form>

                    {/*Sell button*/}
                    <form onSubmit={(event) => this.handleSell(event)}>
                        <input type="text" placeholder="x amount of shares" onChange={(event) => this.handleSellChange(event)}/>
                        <input type="submit" value="Sell" />
                    </form>

            </div>
        );
    } 
}

//Helper functions 
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default Trade;