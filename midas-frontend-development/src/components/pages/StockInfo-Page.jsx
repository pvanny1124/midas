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
        return ( 
            <div className="stockInfo-page container">
                <div className="page-left">
                    <Trade getUser={(user) => this.props.getUser(user)} tickerData={this.state} user={this.props.user}/>
                </div>

                <div className="page-center">
                    <StockInfo key={this.props.key} {...this.props}  getUser={(user) => this.props.getUserData(user)} ticker={this.props.ticker} user={this.props.user} getUser={(user) => this.props.getUserData(user)} />
                </div>

                <div className="page-right">
                    <Simulator userId={this.props.user.id} />
                </div>
            </div>
         );
    }
}
 

export default StockInfoPage;