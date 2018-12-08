import { USER_LOGGED_IN } from "../actions/actionCreators";

const initialState = {
    user: null,
    ticker: null
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case USER_LOGGED_IN:
    }
}