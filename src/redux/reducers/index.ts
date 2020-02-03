import { combineReducers } from "redux";
import userReducer from "./userReducer";
import coinReducer from "./coinReducers";
import inventoryReducer from "./inventoryReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
    userReducer,
    coinReducer,
    inventoryReducer,
    groupReducer
});