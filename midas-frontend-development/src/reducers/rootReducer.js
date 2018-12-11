// combineReducers is used to package all reducers under one object mapped to a 
// specific state that the reducer is supposed to change/update
import { combineReducers } from "redux";

// import all necessary reducers
import userReducer from './userReducer';
import stocksReducer from './stocksReducer';


const rootReducer = combineReducers({
        //map specific reducers to the state variables that they are supposed to handle
        currentUser: userReducer,
        suggestions: stocksReducer,
        stocksFound: stocksReducer
})

export default rootReducer;




