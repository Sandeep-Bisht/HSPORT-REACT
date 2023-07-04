import { combineReducers } from "redux";
import UserCartReducer from "../Components/Header/Reducer";
import CartReducer from "../CommonServices/Reducer"

const rootReducer = combineReducers({
    UserCartReducer,
    CartReducer
});

export default rootReducer;