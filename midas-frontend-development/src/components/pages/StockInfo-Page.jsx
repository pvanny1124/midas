import React, { Component } from 'react';
import StockInfo from '../StockInfo';
import Simulator from '../Simulator';
import Trade from '../Trade';


class StockInfoPage extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render() { 
        console.log("%cTICKER","color: green");
        console.log(this.props.ticker);
        return ( 
            <div className="stockInfo-page container">
            { 
                this.props.user ?  
                <div className="page-left">
                    <Simulator userId={this.props.user.id} />    
                </div> 
                : 
                <p>Please sign in to trade</p>}
               

                <div className="page-center">
                    <StockInfo  key={this.props.key} {...this.props}  
                                getUser={(user) => this.props.getUserData(user)} 
                                ticker={this.props.ticker} 
                                user={this.props.user}  />
                </div>
                { 
                    this.props.user ? 
                    <div className="page-right">
                        <Trade  getUser={(user) => this.props.getUser(user)} 
                            tickerData={this.props} 
                            user={this.props.user}/>
                    </div> 
                    : 
                    <p>Please sign in to trade</p>
                }
                
            </div>
         );
    }
}
 

export default StockInfoPage;