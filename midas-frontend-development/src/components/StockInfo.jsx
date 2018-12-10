import React, { Component } from 'react';
import DisplayField from './DisplayField';
import DisplayTitle from './DisplayTitle';
import Price from './Price';
import { withRouter } from 'react-router';
import Chart from './Chart';
import SelectRange from './SelectRange';


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
            CEO: null,
            num_of_employees: null,
            week52High: null,
            week52Low: null,
            chartRange: "1m"
         }
    }

    componentDidMount(){
        console.log("PROPS IN STOCK INFO")
        console.log(this.props)

        if(this.props.location.pathname == "/"){
            //hold a dummy for now
            this.getStockInfo("aapl");
        } else {
            this.getStockInfo(this.props.match.params.ticker);
            this.setState({ticker:this.props.match.params.ticker});
        }
       
    }

    // getStockInfo is central function for the API calls since we need multiple 
    // calls to get all data
    getStockInfo = async (ticker) =>{
        await this.getStockInfo_Company(ticker);
        await this.getStockInfo_Quote(ticker);
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

    setChartRange(range){
        this.setState({
            chartRange: range
        })
    }

    render() { 

        console.log("ticker in stock info" + this.state.ticker)
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
        });

        const { ticker, price, week52High, week52Low, chartRange, market_cap, volume, CEO, description } = this.state;

        return ( 
            <div className="stock-info-card card">
                <div className="stock-info-head">
                    <DisplayTitle classname={"stock-info-ticker"} title={ticker}/>
                    <Price price={price} w52high={week52High} w52low={week52Low} />
                </div>

                <div className="stock-info-chart">
                    {console.log("in stockingo div... " + ticker)}
                    <Chart ticker={ticker} range={chartRange}/>
                </div>
                
                <div className="stock-info-select-range">
                    <SelectRange setChartRange={this.setChartRange}/>
                </div>

                <div className="stock-info-body">
                    <div className="stock-info-left">
                        {/* <DisplayField d_key={"Chart"} value={chart}/> */}
                        <DisplayField d_key={"Market Cap"} value={formatter.format(market_cap)}/>
                        <DisplayField d_key={"Volume"} value={volume}/>
                        <DisplayField d_key={"CEO"} value={CEO} />
                    </div>
                    <div className="stock-info-right">
                        <DisplayField d_key={"52 Week High"} value={formatter.format(week52High)}/>    
                        <DisplayField d_key={"52 Week Low"} value={formatter.format(week52Low)}/>    
                    </div>
                </div>
                <div className="stock-info-bottom">
                    <DisplayField d_key={"About"} value={description}/>
                </div>
            </div>
         );
    }
}
 
export default withRouter(StockInfo);