
//User actions
import { userConstants } from '../actions/actions.users';
const initialState = {
    currentUser: null,
    isAuthenticated: false
}

const authenticationReducer = function(state = initialState, action){
    switch(action.type){

        case userConstants.LOGIN_SUCCESS: {
            return {
                isAuthenticated: true,
                currentUser: action.payload
            }
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return {
                isAuthenticated: false,
                currentUser: null
            };
            break;
        }

        case userConstants.LOGOUT_SUCCESS: {
            return {
                isAuthenticated: false,
                currentUser: null
            };
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return {
                ...state
            };
            break;
        }

        case userConstants.SESSION_ACTIVE: {
            return {
                isAuthenticated: true,
                currentUser: action.payload
            };
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return {
                isAuthenticated: false,
                currentUser: null
            };

            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return {
                isAuthenticated: true,
                currentUser: action.payload
            }
            break;
        }

        case userConstants.REGISTER_FAILURE: {
            return {
                isAuthenticated: false,
                currentUser: null
            };
            break;
        }
        default:
        return state;


    }
}

export default authenticationReducer;
