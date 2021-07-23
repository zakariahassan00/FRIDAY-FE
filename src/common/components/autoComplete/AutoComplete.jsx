import React, { useState, useEffect } from "react";
import "./autoComplete.scss";

const AutoComplete = ({
  name,
  options,
  placeholder,
  emptyOptionsMsg = "No Available Data",
  onChange,
  fallBack,
  disabled,
  watchValue,
}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // if this AutoComplete is dependant on a value (watchValue)
    // then we have to make sure that this component value is clear
    setValue("");
  }, [watchValue]);

  const hanldeTextChange = (e) => {
    setOpen(true);
    setValue(e.target.value);
  };

  const handleLoseFocus = (e) => {
    setOpen(false);
  };

  const handleListClick = (value) => {
    onChange(value);
    setValue(value);
  };

  const renderList = () => {
    if (!options.loaded) return <li data-testid="autocomplete-loading-message">Loading...</li>;
    // this fallBack fn acts as "Try Again", if there is an error try again with the provided fn in fallback
    else if (options.errors) {
      fallBack && fallBack();
    }

    const filterOptions = options.data.filter((option) =>
      option.toString().toLowerCase().includes(value?.toString().toLowerCase())
    );
    
    if (filterOptions.length === 0)
      return <li data-testid="autocomplete-empty-message" onMouseDown={() => handleListClick("")}>{emptyOptionsMsg}</li>;
    else
      return filterOptions.map((option) => (
        <li data-testid="autocomplete-item" key={option} onMouseDown={() => handleListClick(option)}>
          {option}
        </li>
      ));
  };


  return (
    <div className="autocomplete">
      <input
        data-testid={name}
        disabled={disabled}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={hanldeTextChange}
        onFocus={() => setOpen(true)}
        onBlur={handleLoseFocus}
      />

      {open && (
        <div className="autocomplete__list">
          <ul>{renderList()}</ul>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
