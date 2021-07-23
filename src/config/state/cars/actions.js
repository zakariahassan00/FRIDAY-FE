import Types from './types';
import Services from '../../services/carsServices';
import handleReduxDispatch from '../../http/handleReduxDispatch';

export const getCarsMakes = () => async dispatch =>
    handleReduxDispatch({ service: () => Services.fetchAllCarsMakes(), success: Types.GET_CARS_MAKES_SUCCESS }, dispatch);

export const getCarsModels = (selectedCarMaker) => async dispatch =>
    handleReduxDispatch({ service: () => Services.fetchAllCarsModels(selectedCarMaker), success: Types.GET_CARS_MODELS_SUCCESS }, dispatch);

export const getSelectedCars = (params) => async dispatch =>
    handleReduxDispatch({ service: () => Services.fetchSelectedCars(params), success: Types.GET_SELECTED_CARS_SUCCESS }, dispatch);
