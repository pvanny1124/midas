
//User actions
import { userConstants } from '../actions/actions.users';
const initialState = {
    isUserAuthenticated: false
}

const authenticationReducer = function(state = false, action){
    switch(action.type){

        case userConstants.LOGIN_SUCCESS: {
            return true;
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return false;
            break;
        }

        case userConstants.SESSION_ACTIVE: {
            return true;
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return false;
            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return true;
            break;
        }

        case userConstants.REGISTER_FAILURE: {
            return false;
            break;
        }

        default:
        return state;


    }
}

export default authenticationReducer;