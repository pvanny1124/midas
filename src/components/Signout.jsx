import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Signout extends Component {
      state = {
        redirect: false
      }
    
      componentDidMount() {
        this.props.resetUser();
        fetch("/logout")
        .then(response => {
          if(response.status === 200){
            this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
          } 
        })
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }
    render(){
      return this.state.redirect
      ? <Redirect to="/" />
      : ( 
        <div>
             <div className="loader"></div>
             <p className="signing-out">Signing you out...</p>

        </div>
         

        )

    }
}

export default Signout;