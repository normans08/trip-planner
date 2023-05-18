import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Box, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import ItineraryListing from "../../components/itineraryListing";
import InitialLoader from "../../components/dialog/InitialLoader";
import { useParams } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhdmVlbi0wOCIsImEiOiJjbDJxMTAxZG8yazZuM2dvN3R0MW9tdnRoIn0.8zkOk6-ff0A6lA5XScrx2g";

const View = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState(2);
  const [userInfo, setUserInfo] = useState(null);
  const [value, setValue] = React.useState(0);
  const [gptRes, setGptRes] = useState("");
  const [loader, setLoader] = useState(true);
  const params = useParams();

  let { id } = params;
  let selectedTrip = userInfo?.find((item) => item?.id == id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let newArr = window.localStorage.getItem("trip-plain");
      let parsed = JSON.parse(newArr);
      if (parsed) {
        let selectedTrip = parsed?.find((item) => item?.id == id);
        setGptRes(selectedTrip?.chatgpt);
        setUserInfo(parsed);
        setLat(selectedTrip?.lat);
        setLng(selectedTrip?.long);
      }
    }
  }, []);
  const popUp = new mapboxgl.Popup({
    closeButton: false,
    maxWidth: "400px",

    anchor: "bottom",
  }).setHTML(
    `<div class="popup">
    <h2 class='map-title'>Launching Soon...</h2>
    <img class='img-url'src="https://www.shobha-enterprises.com/un_const_or.svg"/>
   
    </div>`
  );
  const popUp2 = new mapboxgl.Popup({
    closeButton: false,

    anchor: "left",
  }).setHTML(
    `<div class="popup"><h2>Launching Soon...</h2>
    <img src="https://media.istockphoto.com/id/611065352/photo/hills-and-clouds.jpg?s=612x612&w=0&k=20&c=chTA9wiQxovOYfy1AH0ejqfNBaHC5OIuGtxc2pd9LUw="/>
    </div>`
  );

  useEffect(() => {
    if (lat) {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      new mapboxgl.Marker({ color: "#eb9029", scale: 1.5 })
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map.current);
      // new mapboxgl.Marker({ color: "#e8eb29", scale: 1.5 })
      //   .setLngLat([77.1734, 31.1048])
      //   .setPopup(popUp2)
      //   .addTo(map.current);

      map.current.zoomTo(10, { duration: 15000 });
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const timer = setTimeout(() => {
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          height: "100vh",
          backgroundColor: "white",
          width: "56%",
          zIndex: "1",
          overflowY: "auto",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography variant="body1" sx={{ color: "#a1a1a1" }}>
            Your trip to
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {selectedTrip && selectedTrip?.destination?.label}
          </Typography>
          <Typography variant="body1" sx={{ color: "#a1a1a1", mt: 3 }}>
            {`With a budget of  $${selectedTrip?.budget}, you can plan your trip for a specific number of days. Please refer to the table below to see the recommended duration for your trip. Let's create an itinerary that perfectly fits your budget and guarantees a memorable experience!`}
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">{`Itinerary for ${
            selectedTrip && selectedTrip?.destination?.label
          }`}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <ItineraryListing gptRes={gptRes} />
        </Box>
      </Box>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <InitialLoader open={loader} />
    </Box>
  );
};
export default View;
