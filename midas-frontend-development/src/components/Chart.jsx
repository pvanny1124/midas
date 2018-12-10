import React, { Component } from 'react';
import LineChart from './LineChart';
import SelectRange from "./SelectRange";


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker:null,
      labels:null,
      price:null,
      isLoading:true,
      chartData:{},
      range:"1m"
    }
  }

  componentDidMount() {
    console.log("%cIncomingData","color:green");
    console.log(this.props)
    this.setState({ticker:this.props.ticker})
    this.getChartData();
  }

  getChartData = async () => {
    const { ticker, range} = this.state;

    try{
      const api_call = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/chart/${range}?filter=high,label`);
      const data = await api_call.json()

      console.log("%cChartData","color:green");
      console.log({data})

      var labels_temp = [];
      var price_temp = [];

      for(var i = 0; i < data.length; i++) {
        if(data[i].high < 0 || data[i].high === undefined)
          continue;
        labels_temp.push(data[i].label);
        price_temp.push(data[i].high);
      }

      var borderCol = "rgb(0,200,22)";
      if(price_temp[0] > price_temp[data.length-1])
        borderCol = "rgb(222,0,0)";

      this.setState({
        chartData:{
          labels:labels_temp,
          datasets:[
          {
            label:'Price',
            data: price_temp,
            borderColor: borderCol
          }]
        },
        isLoading:false
      });
    }
    catch(error){
      console.log("%cERROR","color:red");
      console.log(error);
    }
  }


  setRange = (selection) => {
    this.setState({
      range:selection
    });
    this.getChartData();
  }


  render() {
    return (
        <div>
          {
            this.state.isLoading ? 
            <p>Loading...</p> 
            : 
            <LineChart chartData={this.state.chartData} stockName={this.props.stockName}/>
          }
        </div>
    );
  }
}

export default Chart;