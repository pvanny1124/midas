import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/pages/Home-Page";
import ProfilePage from "./components/pages/Profile-Page";
import StockInfoPage from './components/pages/StockInfo-Page';
import Navbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Login from "./components/Login";
import Leaderboards from './components/Leaderboards';
import getStockInfo from './helpers/interactions/iex_interactions';
import { connect } from 'react-redux';
import  { getUserSession } from './actions/actionCreators';

//main styles
import './styles/style.css';

//state variables to be passed to our main app component
const mapStateToProps = state => {
      return  {
        currentUser: state.currentUser,
        fetching: state.fetching,
        fetched: state.fetched,
        ticker: state.ticker,
        isUserAuthenticated: state.isUserAuthenticated

      }
}



class App extends Component {
 
  //check if user is already logged in session
  componentWillMount(){
    this.props.dispatch(getUserSession());
  }


  getSearchedTicker(ticker){
    this.setState({searchedTicker: ticker});
  }

  async getStockData(ticker){
    let stockData = getStockInfo(ticker);
    this.setState({stockData: stockData});
  }

  resetUserData(){
    this.setState({user: null});
  }

  reset(){
    this.forceUpdate()
  }

  render(){
    return (
     
      <Router>
         
         { this.props.fetching.fetching ? (
           <div>
              <div className="loader"></div>
              <p className="welcome-headline">Welcome to Midas</p>

           </div>
            
         ) : (
              
             <div>
                <Navbar  forceUpdate={() => this.forceUpdate} getTicker={(ticker) => this.getSearchedTicker(ticker)}/>
                {/* <Route exact path="/" render={() => <Home user={this.state.user} getUser={(user) => this.getUserData(user)} />} />
                {/* For the following view to render properly, pass key={props.location.key} to make the component re-render since the location changes if the user looks up a new stock*/}

                 {/* <Route path="/stocks/:ticker" render={(props) => <StockInfoPage key={props.location.key} {...props} 
                        reset={() => this.reset()} getUser={(user) => this.getUserData(user)} 
                        ticker={this.state.searchedTicker} user={this.state.user} /> } />
                
                <Route path="/profile" render={() => <ProfilePage user={this.state.user} />} />
                <Route path="/signup" render={() => <Signup getUser={(user) => this.getUserData(user)}/>} />
                <Route path="/login" render={() => <Login getUser={(user) => this.getUserData(user)} />} />
                <Route path="/signout" render={() => <Signout resetUser={() => this.resetUserData()} />} />
                <Route path="/leaderboards" render={() => <Leaderboards />} /> */}
                {/* <Footer /> */}
             </div>
         ) }
         
       
      </Router>
    );
  }
}


export default connect(mapStateToProps, null)(App)