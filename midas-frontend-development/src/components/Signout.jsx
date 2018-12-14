import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser }  from '../actions/actionCreators';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.currentUser.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => ({
  logout(){
    dispatch(logoutUser())
  }
})

class Signout extends Component {

    componentDidMount() {
        this.props.logout()
    }
    
    render(){
      return this.props.isAuthenticated
      ? <Redirect to="/" />
      : ( 
        <div>
             <div className="loader"></div>
             <p className="signing-out">Signing you out...</p>

        </div>
         

        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);