import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { updateEmailInput, updatePasswordInput, login } from '../actions/actionCreators';

const mapStateToProps = state => {
    return {
        email: state.email,
        password: state.loginPassword,
        exists: state.exists
    }
}

const mapDispatchToProps = dispatch => ({
    updateEmailInput(value) {
        dispatch(updateEmailInput(value))
    },

    updatePasswordInput(value) {
        dispatch(updatePasswordInput(value))
    },

    login(email, password) {
        dispatch(login(email, password));
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
        console.log("%cthis-EMAIL:", "color: blue");
        console.log("%c" + this.props.email, "color: green")
        console.log("%cthis-PASSWORD:", "color: blue");
        console.log("%c" + this.props.password, "color: green")
        this.props.login(this.props.email, this.props.password);   
    }

    render() { 
     
        return ( 

            <form onSubmit={(event) => this.handleSubmit(event)}>
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
            </form>
        
         );
    }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));