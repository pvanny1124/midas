import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import News from "./components/news";
import Navbar from "./components/custom-navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/news" component={News} />
        </div>
      </Router>
    );
  }
}

export default App;