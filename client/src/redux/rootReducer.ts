import { combineReducers } from "redux";
import { contactReducer } from "./reducers/contact";
import { userReducer } from "./reducers/user";

export const rootReducer = combineReducers({
    contacts: contactReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>