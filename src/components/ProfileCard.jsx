import React from 'react';
import DisplayField from './DisplayField';

const ProfileCard = (props) => (
    <div className="profile-card">

        <div class="profile-card-top">
            <img className="profile-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="UserProfile"/>
    
            <div className="user-info">
                {
                    props.user.firstName &&
                    <DisplayField d_key={"First Name"} value={props.user.firstName} />
                }
                {
                    props.user.lastName &&
                    <DisplayField d_key={"Last Name"} value={props.user.lastName} />
                }
                {
                    props.user.username &&
                    <DisplayField d_key={"User Name"} value={props.user.username} />
                }
                {
                    props.user.country &&
                    <DisplayField d_key={"Country"} value={props.user.country} />
                }
            </div>
        </div>

        <div className="user-data">
            {
                props.user.cash &&
                <DisplayField d_key={"User Cash"} value={props.user.cash} />
            }
            {
                props.user.portfolioValue &&
                <DisplayField d_key={"Portfolio Value"} value={props.user.portfolioValue} />
            }
        </div>

    </div>
)

export default ProfileCard;