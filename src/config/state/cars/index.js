import { combineReducers } from "redux";
import makesReducer from "./makesReducer";
import modelsReducer from "./modelsReducer";
import selectedCarsReducer from "./selectedCarsReducer";

export default combineReducers({
  makes: makesReducer,
  models: modelsReducer,
  selectedCars: selectedCarsReducer,
});
