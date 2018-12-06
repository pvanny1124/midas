import React, { Component } from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: "",
            password: "",
            exists: false
        }
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }


    handleSubmit(event){
        event.preventDefault();
        fetch("/login", {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(user => {
            console.log("%cLogin-user-debug", "color: purple");
            console.log({user});
            if(user){
                this.props.getUser(user);
                this.props.history.push("/");
            }
        })
        .catch(error => {
            this.setState({exists: true})
        })
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
                    { this.state.exists && <div className="error"> The password you entered does not match the email provided </div>}
                </div>
            </form>
        
         );
    }
}
 
export default withRouter(Login);