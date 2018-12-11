
//User actions
import { userConstants } from '../actions/actions.users';

const userReducer = function(state = {}, action){
    switch(action.type){

        case userConstants.LOGIN_REQUEST: {
            return Object.assign({}, state, {fetching: true})
            break;
        }

        case userConstants.LOGIN_SUCCESS: {
            return {
                ...state, 
                currentUser: action.payload,
                isUserAuthenticated: true,
                fetching: false,
                fetched: true
            }
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return {
                ...state,
                isUserAuthenticated: false,
                fetched: true,
                fetching: false
            }
            break;
        }

        case userConstants.SESSION_REQUEST: {
            return {
                ...state,
                fetching: true
            }
            break;
        }

        case userConstants.SESSION_ACTIVE: {
            return {
                ...state,
                currentUser: action.payload,
                isUserAuthenticated: true,
                fetched: true,
                fetching: false

            }
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return {
                ...state,
                isUserAuthenticated: false,
                fetched: true,
                fetching: false
            }
            break;
        }

        case userConstants.REGISTER_REQUEST: {
            return {
                ...state,
                fetching: true
            }
            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return {
                ...state,
                isUserAuthenticated: true,
                fetching: false,
                fetched: true

            }
            break;
        }

        case userConstants.REGISTER_FAILURE: {
            return {
                ...state,
                isUserAuthenticated: false,
                fetched: true,
                fetching: false
            }
            break;
        }


    }
}

export default userReducer;