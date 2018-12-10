import React, { Component } from 'react';
import MediaDisplay from './MediaDisplay';

const API_PREFIX = "https://api.iextrading.com/1.0";

class TrendingNews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            trending_news: []
         }
    }

    componentWillMount(){
        this.getStockInfo_News("googl");
    }

    getStockInfo_News = async (ticker) => {
        const api_call = await fetch(`${API_PREFIX}/stock/${ticker}/news/last/4`)
        const data = await api_call.json();

        this.setState({
            trending_news: data
        })
    }

    render() { 
        const { trending_news} = this.state;
        const newsFeed = trending_news.map(item => <MediaDisplay news={item} />)

        return (
            <div className="trendingNews-card card">
                {trending_news !== undefined ? newsFeed : <span>Loading</span>}
            </div>
        )
    }
}
 
export default TrendingNews;