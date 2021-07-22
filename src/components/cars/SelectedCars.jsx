import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCars } from "../../config/state/cars/actions";
import Types from "../../config/state/cars/types";
// common
import Pagination from "../../common/components/pagination/Pagination";
// styles
import "./selectedCars.scss"

const SelectedCar = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const selectedCars = useSelector(({ cars }) => cars.selectedCars);
  const [ page, setPage ] = useState(0);
  const ROWS_PER_PAGE = 10;
  const maxPagesCount = Math.floor(selectedCars.count / ROWS_PER_PAGE);
  const carInfoRows = [
    {key: "Engine Power (PS)", value: 'enginePowerPS', measuring_unit: "PS"},
    {key: "Engine Power (KW)", value: 'enginePowerKW', measuring_unit: "KW"},
    {key: "Fuel Type", value: 'bodyType', measuring_unit: ""},
    {key: "Engine Capacity", value: 'engineCapacity', measuring_unit: "CC"},
  ]

  useEffect(() => {
    dispatch(getSelectedCars({ make: params.make, model: params.model }));

    return () => {
      dispatch({type: Types.CLEAN})
    }
  }, [dispatch, params]);

  const handlePageChange = (newPage) => setPage(newPage);

  const renderCars = () => {
    if (!selectedCars.loaded) return <h3 className="viewCars__message">Loading...</h3>
    else if (selectedCars.errors) return <h3 className="viewCars__message">{selectedCars.errors}</h3>
    else if (selectedCars.count === 0) return <h3 className="viewCars__message">No Vehicles Found</h3>
    else return selectedCars.data
    .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
    .map((car, index) => (
    <div key={index} className="viewCars__singleCarInfo">
      <h4>Vehicle info</h4>

      {carInfoRows.map((row, index) => (
        <div key={index} className="viewCars__singleCarInfoRow">
          <p>{row.key}</p>
          <p className="viewCars__singleCarInfoRow_value">{car[row.value]} {row.measuring_unit}</p>
        </div>
      ))}
    </div>
    ))
  };

  return <div className="viewCars slideRight">
    <div className="viewCars__control">

      <Link to="/">
        <button className="backBTN">Back to Search</button>
      </Link>

      <div className="viewCars__path">
        <h4>{`${params.make} > ${params.model}`}</h4>
        <p>{`${selectedCars.count} vehicles found`}</p>
      </div>
    </div>

    <div className="viewCars__list">
      {renderCars()}
    </div>

    {selectedCars.loaded && !selectedCars.errors && 
      <div className="viewCars__pagination">
        <Pagination 
          currentPage={page} 
          handlePageChange={handlePageChange} 
          maxPagesCount={maxPagesCount}
        />
      </div>
    }
  </div>;
};

export default SelectedCar;
