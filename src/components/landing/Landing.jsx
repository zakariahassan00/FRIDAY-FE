import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCarsMakes, getCarsModels } from "../../config/state/cars/actions";
import { useDispatch, useSelector } from "react-redux";
import landingCoverIMG from "../../common/assets/imgs/landing-cars.png";
import AutoComplete from "../../common/components/autoComplete/AutoComplete";
import "./landing.scss";

const Landing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const carsMakes = useSelector(({ cars }) => cars.makes);
  const carsModels = useSelector(({ cars }) => cars.models);
  const [selectedParams, setSelectedParams] = useState({
    make: null,
    model: null,
  });

  const handleMakeChange = (selectedCarMake) => {
    dispatch(getCarsModels(selectedCarMake));
    setSelectedParams({ make: selectedCarMake, model: null });
  };

  const handleModelChange = (selectedCarModel) => {
    setSelectedParams({ ...selectedParams, model: selectedCarModel });
  };

  useEffect(() => {
    dispatch(getCarsMakes());
  }, [dispatch]);

  return (
    <div className="landing">
      <div className="zoom">
        <div className="landing__banner">
          <img src={landingCoverIMG} alt="cars" />
        </div>

        <AutoComplete
          options={carsMakes}
          placeholder="Select your car make"
          emptyOptionsMsg="No make found"
          onChange={handleMakeChange}
          fallBack={() => dispatch(getCarsMakes())}
        />

        <AutoComplete
          options={carsModels}
          placeholder="Select your car model"
          watchValue={selectedParams.make}
          emptyOptionsMsg="No models for this make"
          onChange={handleModelChange}
          fallBack={() => dispatch(getCarsModels(selectedParams.make))}
          disabled={!selectedParams.make}
        />

        <button
          onClick={() =>
            history.push(`/cars/${selectedParams.make}/${selectedParams.model}`)
          }
          className="landing__search"
          disabled={!selectedParams.make || !selectedParams.model}
        >
          Find Your Car
        </button>
      </div>
    </div>
  );
};

export default Landing;
