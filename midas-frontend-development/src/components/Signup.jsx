import React, { Component } from 'react';
import {Link, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateFirstName, 
         updateLastName,
         updateUsername, 
         updateAge,
         updateEmail,
         updateCountry,
         updatePassword,
         signup } from '../actions/actionCreators';

const mapStateToProps = state => {
    return {
        registrationFields: state.registrationFields
    }
}

const mapDispatchToProps = dispatch => ({
    updateFirstName(firstName){
        dispatch(updateFirstName(firstName));
    },
    updateLastName(lastName){
        dispatch(updateLastName(lastName));
    },
    updateEmail(email){
        dispatch(updateEmail(email));
    },
    updateUsername(username){
        dispatch(updateUsername(username));
    },
    updateAge(age){
        dispatch(updateAge(age));
    },
    updateCountry(country){
        dispatch(updateCountry(country));
    },
    updatePassword(password){
        dispatch(updatePassword(password));
    },
    signup(user){
        dispatch(signup(user));
    }
})

class Signup extends Component {
 
    handleFirstNameChange(event){
        this.props.updateFirstName(event.target.value);
    }

    handleLastNameChange(event){
        this.props.updateLastName(event.target.value);
    }

    handleEmailChange(event){
        this.props.updateEmail(event.target.value);
    }

    handleAgeChange(event){
        this.props.updateAge(event.target.value);
    }

    handlePasswordChange(event){
        this.props.updatePassword(event.target.value);
    }

    handleCountryChange(event){
        this.props.updateCountry(event.target.value);
    }

    handleUsernameChange(event){
        this.props.updateUsername(event.target.value);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.registrationField);
        this.props.signup(this.props.registrationFields);
    }

    render(){

        return (
            
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <div class="form-title">
                    <h1>Sign Up</h1>
                </div>
                
                <div class="form-body">
                    <div className="form-group">
                        <input className="form-control" type="text" name="first_name" placeholder="First Name" onChange={(event) => this.handleFirstNameChange(event)}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="last_name" placeholder="Last Name" onChange={(event) => this.handleLastNameChange(event)} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="username" placeholder="Username" onChange={(event) => this.handleUsernameChange(event)} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="email" placeholder="Email" onChange={(event) => this.handleEmailChange(event)} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password" onChange={(event) => this.handlePasswordChange(event)} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="age" placeholder="Age" onChange={(event) => this.handleAgeChange(event) }/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="country" placeholder="Country" onChange={(event) => this.handleCountryChange(event)} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-dark">Sign Up</button>
                    </div>
                    <Link className="not-user" to="/login">Already a user? Log in here.</Link>
                </div>
            </form>
        );
    }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));