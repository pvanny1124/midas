import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { updateEmailInput, updatePasswordInput, login } from '../actions/actionCreators';
import { Redirect } from "react-router-dom"

const mapStateToProps = state => {
    return {
        loginFields: state.loginFields,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => ({
    updateEmailInput(email) {
        dispatch(updateEmailInput(email))
    },

    updatePasswordInput(password) {
        dispatch(updatePasswordInput(password))
    },

    login(loginFields) {
        dispatch(login(loginFields));
    }
})


class Login extends Component {


    handleEmailChange(event){
        this.props.updateEmailInput(event.target.value);
    }

    handlePasswordChange(event){
        this.props.updatePasswordInput(event.target.value);
    }


    handleSubmit(event){
        event.preventDefault();
        console.log("%cLOGIN FIELDS");
        console.log(this.props.loginFields);
        this.props.login(this.props.loginFields);
    }

    render() { 
     
        return ( 
            <div>
                { this.props.isAuthenticated ? (<Redirect to="/" />) :
                    (<form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-title">
                            <h1>Log In</h1>
                        </div>
                        <div class="form-body">
                            <div className="form-group">
                                <input className="form-control" type="text" name="email" placeholder="email" required onChange={(event) => this.handleEmailChange(event)}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" name="password" placeholder="Password" required onChange={(event) => this.handlePasswordChange(event)}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="login-btn btn btn-dark">Log In</button>
                            </div>
                            <Link className="not-user" to="/signup">Not a user? Create an account</Link>
                            { this.props.exists && <div className="error"> The password you entered does not match the email provided </div>}
                        </div>
                    </form>)
                }
        
            </div>
        
         );
    }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));