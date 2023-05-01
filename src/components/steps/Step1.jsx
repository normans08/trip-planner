import React from "react";
import { Solo, Family } from "../../images/index";
const Step1 = () => {
  return (
    <section>
      <div className="info" data-aos="zoom-in-up">
        <h2 className="info__h2">Organize your Adventure</h2>
        <p className="info__p">
          For our AI algorithm to know how to fit the best trip plan for you, we
          need to know a bit about you and your trip
        </p>
      </div>
      <div className="cards" data-aos="zoom-in-up">
        <p className="cards__reason">
          Indicate if you are traveling alone, as a couple or as a family
        </p>
        <div className="cards__container">
          <label className="cards__container-card active">
            <input
              type="radio"
              name="type"
              value="SoloOrCouple"
              checked={true}
            />
            <img
              className="cards__container-card-img"
              src={Solo}
              alt="Solo/Couple"
            />
            <span className="cards__container-card-span">Solo/Couple</span>
          </label>
          <label className="cards__container-card ">
            <input type="radio" name="type" value="FamilyTrip" />
            <img
              className="cards__container-card-img"
              src={Family}
              alt="Family Trip"
            />
            <span className="cards__container-card-span">Family Trip</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default Step1;
