import React, { useEffect } from "react";
import { Solo, Family, Logo } from "../../images/index";
import Stepper from "../../components/stepper/Stepper";
import AOS from "aos";
import "aos/dist/aos.css";
const TripPlanner = () => {
  useEffect(() => {
    AOS.init();
    if (typeof window !== "undefined") {
      window.localStorage.setItem("trip-plain", JSON.stringify([]));
    }
  }, []);
  return (
    <div className="multi-step-form">
      <div className="wrapper">
        <div className="image-holders">
          <img src={Logo} alt="logo" />
          <h1>TRAVEL SMARTER, NOT HARDER</h1>
          <p>
            Save time, explore more: Let our advanced AI navigate the
            complexities of trip planning, so you can focus on making memories.​
          </p>
        </div>
        <Stepper />
      </div>
    </div>
  );
};

export default TripPlanner;
