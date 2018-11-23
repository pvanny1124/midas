import React, { Component } from 'react';
import DisplayField from './DisplayField';
import DisplayTitle from './DisplayTitle';
import Price from './Price';
import TrendingNews from './TrendingNews';

const API_PREFIX = "https://api.iextrading.com/1.0";

class StockInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ticker: null,
            price: null,
            chart: null,
            market_cap: null,
            volume: null,
            description: null,
            trending_news: null,
            CEO: null,
            num_of_employees: null,
            week52High: null,
            week52Low: null
         }
    }

    componentDidMount(){
        this.getStockInfo(this.props.ticker);
    }

    // getStockInfo is central function for the API calls since we need multiple 
    // calls to get all data
    getStockInfo = async (ticker) =>{
        await this.getStockInfo_Company(ticker);
        await this.getStockInfo_Quote(ticker);
        await this.getStockInfo_News(ticker);
    }

    getStockInfo_Company = async (ticker) => {
        const api_call = await fetch(`${API_PREFIX}/stock/${ticker}/company?filter=symbol,CEO,description`);
        const data = await api_call.json();

        this.setState({
            ticker:data.symbol,
            CEO: data.CEO,
            description: data.description
        })
    }

    getStockInfo_Quote = async (ticker) => {
        const api_call = await fetch(`${API_PREFIX}/stock/${ticker}/quote?filter=latestPrice,latestVolume,marketCap,week52High,week52Low`);
        const data = await api_call.json();

        this.setState({
            price: data.latestPrice,
            volume: data.latestVolume,
            market_cap: data.marketCap,
            week52High: data.week52High,
            week52Low: data.week52Low
        })
    }

    getStockInfo_News = async (ticker) => {
        const api_call = await fetch(`${API_PREFIX}/stock/${ticker}/news/last/4`)
        const data = await api_call.json();

        this.setState({
            trending_news: data
        })
    }

    render() { 
        return ( 
            <div className="form-container">
                <div className="stock-info-head row">
                    <DisplayTitle classname={"stock-info-title col-md-6 stock-info-ticker"} title={this.state.ticker}/>
                    <div className="col-md-6">
                        <Price price={this.state.price} w52high={this.state.week52High} w52low={this.state.week52Low} />
                    </div>
                </div>
                <div className="stock-info-body row">
                    <div className="stock-info-left col-md-4">
                        <DisplayField d_key={"Chart"} value={this.state.chart}/>
                        <DisplayField d_key={"Market Cap"} value={this.state.market_cap}/>
                        <DisplayField d_key={"Volume"} value={this.state.volume}/>
                        <DisplayField d_key={"CEO"} value={this.state.CEO} />
                    </div>
                    <div className="stock-info-right col-md-8">
                        <DisplayField d_key={"Description"} value={this.state.description}/>
                    </div>
                    <div className="stock-info-bottom col-md-12">
                        <TrendingNews articles={this.state.trending_news} />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default StockInfo;