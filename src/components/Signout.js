import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Signout extends Component {
      state = {
        redirect: false
      }
    
      componentDidMount() {
        this.props.resetUser();
        this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }
    render(){
      return this.state.redirect
      ? <Redirect to="/" />
      : <div>Signing you out...</div>

    }
}

export default Signout;