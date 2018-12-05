import React, { Component } from 'react';
import MediaDisplay from './MediaDisplay';
import PropTypes from 'prop-types';

class TrendingNews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            news: []
         }
    }

    static propTypes = {
        articles: PropTypes.objectOf(PropTypes.any.isRequired)
      }

    componentWillReceiveProps(nextProps){
        if(nextProps.articles !== undefined && nextProps.articles !== null){
            console.log(`New props coming in: `);


            this.setState({news: nextProps.articles}, ()=> {
                console.log('%c TrendingNews data','color: green;');
                console.log(this.state.news);
            })
        }
    }

    render() { 
        const {news} = this.state;
        const newsFeed = news.map(item => <MediaDisplay news={item} />)

        return news !== undefined ? newsFeed : <span>Loading</span>
    }
}
 
export default TrendingNews;