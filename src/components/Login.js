import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import './login.css'

class Login extends Component {
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        fetch()
    }

    render() { 
        return ( 

                <form className="login_container" onSubmit={(event) => this.handleSubmit}>
                    <div className="login_form">
                    <div className="login_title">
                        <h1>Log In</h1>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="email" placeholder="email" required onChange={(event) => this.handleEmailChange(event)}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="password" placeholder="Password" required onChange={(event) => this.handlePasswordChange(event)}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="login-btn btn btn-dark">Log In</button>
                    </div>
                    <Link className="not-user" to="/signup">Not a user? Create an account</Link>
                    </div>
                </form>
        
         );
    }
}
 
export default Login;