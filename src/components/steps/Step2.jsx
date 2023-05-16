import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LoaderDialog from "../dialog";

const Step2 = ({ state, handleInputChange, loader, showError }) => {
  const [value, setValue] = useState(null);
  const handleChange = (val) => {
    setValue(val);
    state.destination = val;
  };

  return (
    <section data-aos="zoom-in-up">
      <div className="info">
        <h2 className="info__h2">Organize your Adventure</h2>
        <p className="info__p">
          For our AI algorithm to know how to fit the best trip plan for you, we
          need to know a bit about you and your trip
        </p>
      </div>
      {showError && (
        <p
          style={{
            fontSize: "12px",
            color: "crimson",
            paddingBottom: "10px",
            textAlign: "center",
            letterSpacing: "2px",
          }}
        >
          Please fill all fields !
        </p>
      )}
      <div className="form-row custom-form">
        <div className="form-holder">
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
      </div>
      <div className="form-row custom-form">
        <div className="form-holder" style={{ zIndex: "999" }}>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyDA7UjuQmtnp2L2KuYA7lDLHToISahS4x4"
            selectProps={{
              placeholder: "Enter any place",
              value: value,
              onChange: (val) => handleChange(val),
              styles: {
                input: (provided) => ({
                  ...provided,
                  color: "#777777",
                  height: "35px",
                }),

                option: (provided) => ({
                  ...provided,
                  color: "black",
                  zIndex: "999",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#777777",
                }),
              },
            }}
          />
        </div>
      </div>
      <div className="form-row custom-form">
        <div className="form-holder">
          <input
            type="number"
            name="days"
            max={10}
            min={0}
            value={state.days}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Number of days (max 10)"
          />
        </div>
      </div>

      <div className="form-row custom-form">
        <div className="form-holder">
          <input
            name="budget"
            type="number"
            value={state.budget}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Budget (only USD)"
          />
        </div>
      </div>
      <LoaderDialog open={loader} />
    </section>
  );
};

export default Step2;
