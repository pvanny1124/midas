
//User actions
import { userConstants } from '../actions/actions.users';
const initialState = {
    currentUser: null,
}
const userReducer = function(state = initialState, action){
    switch(action.type){

        case userConstants.LOGIN_SUCCESS: {
            return action.payload;
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return null;
            break;
        }

        case userConstants.SESSION_ACTIVE: {
            return action.payload;
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return null;

            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return action.payload;
            break;
        }

        case userConstants.REGISTER_FAILURE: {
            return null;
            break;
        }
        default:
        return state;


    }
}

export default userReducer;