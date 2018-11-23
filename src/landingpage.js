import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Navbar from "./components/CustomNavbar";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Login from "./components/Login";
import Auth from './middlewares/react-auth';
import './landingpage.css'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      searchedTicker: null,
      isLoading: true
    }
  }

  componentWillMount(){
    //check if user is already logged in session
    fetch("/api/auth")
      .then(response => {
          console.log(response);
          return response.json();
      })
      .then(data => {
          this.setState({user: data, isLoading: false});
          console.log(data);
      })
      .catch(error => {
        this.setState({isLoading: false})
          console.log(error);
      })
  }

  getUserData(user){
    this.setState({user: user});
  }

  getSearchedTicker(ticker){
    this.setState({searchedTicker: ticker});
  }

  resetUserData(){
    this.setState({user: null});
  }

  render(){
    console.log(this.state.user);
    return (
      
      <Router>
         
         { this.state.isLoading ? (
            <div>Loading.. please wait!</div>
         ) : (
              
             <div>
                <Navbar user={this.state.user} getTicker={(ticker) => this.getSearchedTicker(ticker)}/>
                <Route exact path="/" render={() => <Home user={this.state.user} getUser={(user) => this.getUserData(user)} />} />
                <Route path="/about" component={About} />
                <Route path="/signup" render={() => <Signup getUser={(user) => this.getUserData(user)}/>} />
                <Route path="/login" render={() => <Login getUser={(user) => this.getUserData(user)} />} />
                <Route path="/signout" render={() => <Signout resetUser={() => this.resetUserData()} />} />
                <Route path="/news" component={News} />
             </div>
         ) }
         
       
      </Router>
    );
  }
}



function PrivateRoute({ component: Component, ...rest }) {
return (
<Route {...rest} render={props =>
    Auth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
    )
  }
/>
);
}
export default App;