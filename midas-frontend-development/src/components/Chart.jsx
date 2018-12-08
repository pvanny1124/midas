import React, { Component } from 'react';
import LineChart from './LineChart';
import { FormGroup, Radio } from "react-bootstrap";

// import './Chart.css'


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
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockName}/chart/${this.props.range}?filter=high,label`)
    .then(response => { 
        return response.json()
    })
    .then(result => {

      var labels_temp = [];
      var price_temp = [];

      for(var i = 0; i < result.length; i++) {
        if(result[i].high < 0 || result[i].high === undefined)
          continue;
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
      
      <FormGroup className="switches">
        <Radio name="radioGroup" inline>
        1d
        </Radio>{' '}
        <Radio name="radioGroup" inline>
        1w
        </Radio>{' '}
        <Radio name="radioGroup" inline>
        1m
        </Radio>
        <Radio name="radioGroup" inline>
        1y
        </Radio>
        <Radio name="radioGroup" inline>
        3m
        </Radio>
        <Radio name="radioGroup" inline>
        1y
        </Radio>
        <Radio name="radioGroup" inline>
        5y
        </Radio>
      </FormGroup>
                </div>
        );
    }
  }

export default Chart;