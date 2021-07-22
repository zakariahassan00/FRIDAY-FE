import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as carsActions from "../../config/state/cars/actions";
import { useDispatch, useSelector } from "react-redux";
import landingCoverIMG from "../../common/assets/imgs/landing-cars.png";
import AutoComplete from "../../common/components/autoComplete/AutoComplete";
import Helpers from "../../common/helpers";
import "./landing.scss";

const Landing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector(({ cars }) => ({
    makes: cars.makes,
    models: cars.models,
    selectedCars: cars.selectedCars,
  }));
  const [filtredSelectedCars, setFiltredSelectedCars] = useState(cars.selectedCars);
  const [selectedParams, setSelectedParams] = useState({
    make: null,
    model: null,
    bodyType: null,
    engPower: null,
  });

  useEffect(() => {
    dispatch(carsActions.getCarsMakes());
  }, [dispatch]);

  const handleMakeChange = (selectedCarMake) => {
    dispatch(carsActions.getCarsModels(selectedCarMake));
    setSelectedParams({ make: selectedCarMake, model: null });
  };

  const handleModelChange = (selectedCarModel) => {
    setSelectedParams({
      ...selectedParams,
      model: selectedCarModel,
      bodyType: null,
    });
    dispatch(carsActions.getSelectedCars({
        ...selectedParams,
        model: selectedCarModel,
      })
    );
  };

  const handleBodyTypeChange = (selectedBody) => {
    setSelectedParams({ ...selectedParams, bodyType: selectedBody, engPower: null });
    setFiltredSelectedCars({ data: cars.selectedCars.data.filter((car) => 
      car.bodyType === selectedBody),
    });
  };

  const handleEngPowerChange = (selecetedEngPower) => {
    setSelectedParams({ ...selectedParams, engPower: selecetedEngPower });
    setFiltredSelectedCars({data: filtredSelectedCars.data.filter((car) => 
      car.enginePowerPS === selecetedEngPower),
    });
  };

  return (
    <div className="landing">
      <div className="zoom">
        <div className="landing__banner">
          <img src={landingCoverIMG} alt="cars" />
        </div>

        <AutoComplete
          options={cars.makes}
          placeholder="Select your car make"
          emptyOptionsMsg="No make found"
          onChange={handleMakeChange}
          fallBack={() => dispatch(carsActions.getCarsMakes())}
        />

        <AutoComplete
          options={cars.models}
          placeholder="Select your car model"
          watchValue={selectedParams.make}
          emptyOptionsMsg="No models for this make"
          onChange={handleModelChange}
          fallBack={() =>
            dispatch(carsActions.getCarsModels(selectedParams.make))
          }
          disabled={!selectedParams.make}
        />

        <AutoComplete
          options={{
            data: Helpers.extractFilterValue(cars.selectedCars.data,"bodyType"),
            loaded: true,
            errors: cars.selectedCars.errors
          }}
          placeholder="Car Body Type"
          emptyOptionsMsg="No Available Data"
          watchValue={selectedParams.model}
          onChange={handleBodyTypeChange}
          fallBack={() =>
            dispatch(carsActions.getSelectedCars(selectedParams))
          }
          disabled={!selectedParams.model}
        />

        <AutoComplete
          options={{
            data: Helpers.extractFilterValue(filtredSelectedCars.data,"enginePowerPS"),
            loaded: true,
          }}
          placeholder="Engine Power (PS)"
          emptyOptionsMsg="No Available Data"
          watchValue={selectedParams.bodyType}
          onChange={handleEngPowerChange}
          disabled={!selectedParams.bodyType}
        />

        <button
          onClick={() =>
            history.push(
              `/cars/${selectedParams.make}/${selectedParams.model}/${selectedParams.bodyType}/${selectedParams.engPower}`
            )
          }
          className="landing__search"
          disabled={Helpers.includesUnvalidValue(selectedParams)}
        >
          Find My Car
        </button>
      </div>
    </div>
  );
};

export default Landing;
