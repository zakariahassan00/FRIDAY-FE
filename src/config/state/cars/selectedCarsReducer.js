import Types from "./types.js";

const INITIAL_STATE = {
    data: [],
    loaded: false,
    errors: false,
    count: 0
};

const carReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_SELECTED_CAR_SUCCESS:
      return { data: action.payload, errors: false, loaded: true, count: action.payload.length };
    case Types.GET_SELECTED_CAR_REQUEST:
      return { ...state, loaded: false };
    case Types.GET_SELECTED_CAR_ERROR:
      return { ...state, loaded: true, errors: action.payload };
    case Types.CLEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default carReducer;
