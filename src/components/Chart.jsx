import React, { Component } from 'react';
import LineChart from './linechart';


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels:null,
      price:null,
      isLoading:true,
      chartData:{}
    }
  }

  componentWillMount(){


    console.log(this.props)
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockName}/chart/${this.props.range}?filter=high,label`)
    .then(response => response.json())
    .then(result => {

      var labels_temp = [];
      var price_temp = [];

      for(var i = 0; i < result.length; i++) {
        labels_temp.push(result[i].label);
        price_temp.push(result[i].high);
      }

      var borderCol = "rgb(0,200,22)";
      if(price_temp[0] > price_temp[result.length-1])
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
        }
      });
      this.setState({ isLoading:false});
    });

  }


  render() {
    if (this.state.isLoading)
      return <p>Loading...</p>;
    else 
      return (
          <LineChart chartData={this.state.chartData} stockName={this.props.stockName}/>
      );
    }
  }

export default Chart;