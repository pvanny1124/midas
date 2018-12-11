
//User actions
import { userConstants } from '../actions/actions.users';
const initialState = {
    fetching: true,
}
const fetchingReducer = function(state = true, action){
    switch(action.type){

        case userConstants.LOGIN_REQUEST: {
            return true;
            break;
        }

        case userConstants.LOGIN_SUCCESS: {
            return false;
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return false;
            break;
        }

        case userConstants.SESSION_REQUEST: {
            return true;
            break;
        }

        case userConstants.SESSION_ACTIVE: {
            return false;
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return false;
            break;
        }

        case userConstants.REGISTER_REQUEST: {
            return true;
            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return {
                ...state,
                fetching: false

            }
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

export default fetchingReducer;