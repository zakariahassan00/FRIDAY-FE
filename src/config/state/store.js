import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const rootReducer = combineReducers({
  ...reducers,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
