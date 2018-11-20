import React from 'react';
import {Link} from 'react-router-dom';

class Signup extends Component {

    handleSubmit(){
        //make request to backend api to signup user
    }
    render(){
        return (
            <div className="login_container">
            <form onSubmit={(event) => this.handleSubmit(event)>
                <div class="login_title">
                    <h1>Sign Up</h1>
                </div>
                <div className="form-group">
                    <input type="text" name="first_name" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <input type="text" name="last_name" placeholder="Last Name"/>
                </div>
                <div className="form-group">
                    <input type="text" name="email" placeholder="email" />
                </div>
                <div className="form-group">
                    <input type="text" name="password" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-dark">Sign Up</button>
                </div>
                <Link className="not-user" to="/login">Already a user? Log in here.</Link>
            </form>
        </div>
        );
    }
    
}

export default Signup;