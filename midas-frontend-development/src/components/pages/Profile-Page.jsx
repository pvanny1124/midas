import React, { Component } from "react";
import { withRouter } from 'react-router';
import ProfileCard from "../ProfileCard";
import Simulator from "../Simulator";

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render() {
    console.log("%cUserData","color: green")
    console.log(this.props.users)

    return (
      <div className="profile-page container">
        <div className="page-left">
          {
            
            this.props.user && <ProfileCard user={this.props.user}/>
          }
        </div>
        <div className="page-right">
          <Simulator userId={this.props.user.id} />  
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);
