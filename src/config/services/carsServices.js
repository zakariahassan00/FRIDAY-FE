import { API } from "../../common/constants";
import Http from '../http/index';

const services = {
    fetchAllCarsMakes: async () => await Http.GET(`${API}/makes`),
    fetchAllCarsModels: async (selectedCarMaker) => await Http.GET(`${API}/models?make=${selectedCarMaker}`),
    fetchSelectedCar: async (params) => await Http.GET(`${API}/vehicles?make=${params.make}&model=${params.model}`)
}

export default services
