import React, { useEffect } from "react";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const Stepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [userTodos, setUserTodos] = React.useState([]);
  const [lng, setLng] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [showError, setError] = React.useState(false);
  const [LocationInfo, setLocationInfo] = React.useState([]);
  let API_KEY =
    "pk.eyJ1IjoicHJhdmVlbi0wOCIsImEiOiJjbDJxMTAxZG8yazZuM2dvN3R0MW9tdnRoIn0.8zkOk6-ff0A6lA5XScrx2g";
  const date = new Date();
  const router = useNavigate();
  const [state, setState] = React.useState({
    name: "",
    destination: "",
    nearByPlaces: "",
    days: "",
    lat: lat,
    long: lng,
    date: "",
    budget: "",
    chatgpt: null,
  });
  useEffect(() => {
    let newArr = window.localStorage.getItem("trip-plain");
    let parsed = JSON.parse(newArr);
    setUserTodos(parsed);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      id: uuidv4(),
      date: date.toLocaleDateString(),
    }));
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state?.destination?.label && state.budget && state.name && state.days) {
      setLoader(true);
      setError(false);
      const response = await axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${state?.destination?.label}.json?access_token=${API_KEY}`
        )
        .then((res) => {
          state.lat = res.data.features[0].geometry.coordinates[1];
          state.long = res.data.features[0].geometry.coordinates[0];
          setLat(res.data.features[0].geometry.coordinates[1]);

          setLng(res.data.features[0].geometry.coordinates[0]);

          return res;
        });

      setLat(response.data.features[0].geometry.coordinates[1]);

      setLng(response.data.features[0].geometry.coordinates[0]);
      if (response.data.features[0].geometry.coordinates[0]) {
        let parmas = {
          budget: state.budget,
          places: state?.destination?.label,
          days: state.days,
        };

        let gptResponse = await axios.post(
          "https://hot-dumpling.com/trip-details",
          {
            data: parmas,
          }
        );

        if (
          gptResponse.status === 200 ||
          (gptResponse.status === 201 && gptResponse.data)
        ) {
          let parsedObj = gptResponse.data?.data;
          state.chatgpt = parsedObj;

          setLoader(false);
          userTodos.push(state);
          window.localStorage.setItem("trip-plain", JSON.stringify(userTodos));
          // handleNext();
          router("/listPlanner");
        } else {
          setLoader(false);
        }
      } else if (!state?.destination?.label) {
        setLoader(false);
      }
    } else {
      setError(false);
    }
  };

  return (
    <div className="form-card">
      <form action="" className="form-info">
        <div className="form-header">
          <a href="#">{`Step ${activeStep + 1}`}</a>
        </div>
        <div id="wizard">
          <h4></h4>

          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && (
            <Step2
              handleInputChange={handleInputChange}
              state={state}
              loader={loader}
              showError={showError}
            />
          )}

          <React.Fragment>
            <div className="actions clearfix">
              <ul role="menu" aria-label="Pagination">
                <li
                  role="presentation"
                  aria-disabled={activeStep === 0 ? "true" : "false"}
                  onClick={handleBack}
                >
                  <a role="menuitem">Back</a>
                </li>
                {activeStep < 1 ? (
                  <li
                    aria-hidden="false"
                    aria-disabled="false"
                    onClick={handleNext}
                  >
                    <a aria-hidden="false" role="menuitem">
                      Next
                    </a>
                  </li>
                ) : (
                  <li>
                    <a
                      role="menuitem"
                      className="submitBtn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </React.Fragment>
        </div>
      </form>
    </div>
  );
};

export default Stepper;
