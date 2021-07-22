import Types from "./types";

const INITIAL_STATE = {
    data: [],
    loaded: false,
    errors: false,
};

const modelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_CARS_MODELS_SUCCESS:
      return { data: action.payload, errors: false, loaded: true };
    case Types.GET_CARS_MODELS_REQUEST:
      return { ...state, loaded: false };
    case Types.GET_CARS_MODELS_ERROR:
      return { ...state, loaded: true, errors: action.payload };
    default:
      return state;
  }
};

export default modelsReducer;
