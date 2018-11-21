import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import './login.css'

class Login extends Component {
    render() { 
        return ( 

                <form className="login_container">
                    <div className="login_form">
                    <div className="login_title">
                        <h1>Log In</h1>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="email" placeholder="email" required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="password" placeholder="Password" required/>
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