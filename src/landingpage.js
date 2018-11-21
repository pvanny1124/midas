import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import News from "./components/news";
import Navbar from "./components/custom-navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import './landingpage.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/news" component={News} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;