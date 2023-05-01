import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TripPlanner from "./pages/trip-planner/TripPlanner";
import ListPlanner from "./pages/listPlanner/ListPlanner";
import View from "./pages/listPlanner/View";
function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("trip-plain", JSON.stringify([]));
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<TripPlanner />}></Route>
      <Route exact path="/listPlanner" element={<ListPlanner />}></Route>
      <Route exact path="/listPlanner/:id" element={<View />}></Route>
    </Routes>
  );
}

export default App;
