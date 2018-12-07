import React, { Component } from 'react';
import StockInfo from '../StockInfo';


class StockInfoPage extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render() { 
        return ( 
            <div className="stock-info-page container">
                <div className="page-left">
                
                </div>

                <div className="page-center">
                    <StockInfo key={this.props.key} {...this.props}  getUser={(user) => this.props.getUserData(user)} ticker={this.props.ticker} user={this.props.user} getUser={(user) => this.props.getUserData(user)} />
                </div>

                <div className="page-right">
                
                </div>
            </div>
         );
    }
}
 

export default StockInfoPage;