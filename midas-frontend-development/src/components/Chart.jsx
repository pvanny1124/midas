import React, { Component } from 'react';
import LineChart from './LineChart';


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


  //need to place logic in render or else the component wont update its props acordingly
  render() {

    console.log(this.props)
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockName}/chart/${this.props.range}?filter=high,label`)
    .then(response => { 
        return response.json()
    })
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
        },
        isLoading:false
      });
    })
    .catch(error => {
        console.log(error);
    })

    return (
                <div>
                    {this.state.isLoading ? <p>Loading...</p> : <LineChart chartData={this.state.chartData} stockName={this.props.stockName}/>}
                </div>
        );
    }
  }

export default Chart;