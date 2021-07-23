import Types from "./types";
import { combineReducers } from 'redux';
const INITIAL_STATE = {
    data: [],
    loaded: false,
    errors: false,
};

function generateGetListReducer(listName) {
    return function listReducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case Types[`GET_${listName}_SUCCESS`]:
              return { data: action.payload, errors: false, loaded: true };
            case Types[`GET_${listName}_REQUEST`]:
              return { ...state, loaded: false };
            case Types[`GET_${listName}_ERROR`]:
              return { ...state, loaded: true, errors: action.payload };
            case Types.CLEAN:
            return INITIAL_STATE;  
            default:
              return state;
          }
    }
}


export default combineReducers({
    makes: generateGetListReducer("CARS_MAKES"),
    models: generateGetListReducer("CARS_MODELS"),
    selectedCars: generateGetListReducer("SELECTED_CARS"),
});

