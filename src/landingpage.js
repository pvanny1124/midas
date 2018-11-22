import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import News from "./components/news";
import Navbar from "./components/custom-navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Auth from './middlewares/react-auth';
import './landingpage.css'




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: ""
    }
  }

  getUserData(user){
    console.log("getting user info")
    console.log(user.id)
    this.setState({user: user});
  }

  render(){
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} />
          <Route exact path="/" render={() => <Home user={this.state.user} />} />
          <Route path="/about" component={About} />
          {/* <Route path="/news" component={News} /> */}
          <Route path="/signup" render={() => <Signup getUser={(user) => this.getUserData(user)}/>} />
          <Route path="/login" render={() => <Login getUser={(user) => this.getUserData(user)} />} />
          <PrivateRoute path="/news" component={News} />
        </div>
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