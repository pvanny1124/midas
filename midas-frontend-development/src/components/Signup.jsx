import React, { Component } from 'react';
import {Link, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './Home';
// import './css/Signup.css'


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            username: "",
            age: "",
            country: "",
            portfolio: {},
            portfolioValue: 10000,
            cash: 10000,
            wrongPassword: false,
            emailExists: false,
            usernameExists: false,
            displayError: false,
            errorMessageObject: { //will hold respective error messages for each input field
                email: "",
                username: "",
                password: "",
                firstName: "",
                lastName: "",
            }
        }
    }

    handleFirstNameChange(event){
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event){
        this.setState({lastName: event.target.value});
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handleAgeChange(event){
        this.setState({age: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleCountryChange(event){
        this.setState({country: event.target.value});
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        //first check if the input fields are not empty

        let { firstName, lastName, username, password, email } = this.state;

        if(firstName || lastName || username || password || email){
                if(!firstName){
                    this.setState({
                        displayError: true,
                        errorMessageObject: Object.assign({}, this.state.errorObject, {
                            firstName: "You must include your first name"
                        })
                    })
                } 
                
                if(!lastName){
                    this.setState({
                        displayError: true,
                        errorMessageObject: Object.assign({}, this.state.errorObject, {
                            lastName: "You must include your last name"
                        })
                    })
                }
                
                if(!username){
                    this.setState({
                        displayError: true,
                        errorMessageObject: Object.assign({}, this.state.errorObject, {
                            username: "username can't be empty"
                        })
                    })
                } 
                
                if(!password){
                    this.setState({
                        displayError: true,
                        errorMessageObject: Object.assign({}, this.state.errorObject, {
                            password: "password can't be empty"
                        })
                    })
                }

                if(!email){
                    this.setState({
                        displayError: true,
                        errorMessageObject: Object.assign({}, this.state.errorObject, {
                            email: "email can't be empty"
                        })
                    })
                }

                return;

        }
 
    
            
        

        //make request to backend api to signup user
        fetch("/signup", {
            method: "post",
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                firstName: this.state.firstName, 
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                age: this.state.age,
                country: this.state.country,
                cash: this.state.cash,
                portfolio: this.state.portfolio,
                portfolioValue: this.state.portfolioValue
            })
          })
          .then((response) => {
                console.log(response);
                return response.json();
          })

          .then((message) => {
              console.log(message);

              //authenticate user in the backend to save them in session
              if(message.userCreated){
                    fetch("/login", {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json"
                        }),
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    })
                    .then(response => {
                        console.log(response)
                        if(response === 200){
                            console.log("successfully authenticated");
                        }
                    })
                    .then(() => {
                        this.props.getUser(message.user);
                        this.props.history.push("/");
                    })
                    
              } 
          })
          .catch((err) => {
              this.setState({
                  displayError: true
              })
              console.log(err);
          })
    }
    render(){

        let errors = [];
        console.log(this.state.errorMessageObject);
        for(let message in this.state.errorMessageObject){
            errors.push(<li key={message}>this.state.errorMessageObject[message]</li>);
        }
        console.log(errors);
        return (
            
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <div class="form-title">
                    <h1>Sign Up</h1>
                </div>
                {this.state.displayError && 
                        <div className="signup-error">
                            <p>{errors}</p>
                        </div>}
                
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

export default withRouter(Signup);;