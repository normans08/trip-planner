import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Box, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import ItineraryListing from "../../components/itineraryListing";
import InitialLoader from "../../components/dialog/InitialLoader";
import { useParams } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhdmVlbi0wOCIsImEiOiJjbDJxMTAxZG8yazZuM2dvN3R0MW9tdnRoIn0.8zkOk6-ff0A6lA5XScrx2g";

const stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.034084142948, 38.909671288923],
      },
      properties: {
        phoneFormatted: "(202) 234-7336",
        phone: "2022347336",
        address: "1471 P St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.049766, 38.900772],
      },
      properties: {
        phoneFormatted: "(202) 507-8357",
        phone: "2025078357",
        address: "2221 I St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 22nd St NW",
        postalCode: "20037",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.043929, 38.910525],
      },
      properties: {
        phoneFormatted: "(202) 387-9338",
        phone: "2023879338",
        address: "1512 Connecticut Ave NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at Dupont Circle",
        postalCode: "20036",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.0672, 38.90516896],
      },
      properties: {
        phoneFormatted: "(202) 337-9338",
        phone: "2023379338",
        address: "3333 M St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 34th St NW",
        postalCode: "20007",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.002583742142, 38.887041080933],
      },
      properties: {
        phoneFormatted: "(202) 547-9338",
        phone: "2025479338",
        address: "221 Pennsylvania Ave SE",
        city: "Washington DC",
        country: "United States",
        crossStreet: "btwn 2nd & 3rd Sts. SE",
        postalCode: "20003",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-76.933492720127, 38.99225245786],
      },
      properties: {
        address: "8204 Baltimore Ave",
        city: "College Park",
        country: "United States",
        postalCode: "20740",
        state: "MD",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.097083330154, 38.980979],
      },
      properties: {
        phoneFormatted: "(301) 654-7336",
        phone: "3016547336",
        address: "4831 Bethesda Ave",
        cc: "US",
        city: "Bethesda",
        country: "United States",
        postalCode: "20814",
        state: "MD",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.359425054188, 38.958058116661],
      },
      properties: {
        phoneFormatted: "(571) 203-0082",
        phone: "5712030082",
        address: "11935 Democracy Dr",
        city: "Reston",
        country: "United States",
        crossStreet: "btw Explorer & Library",
        postalCode: "20190",
        state: "VA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.10853099823, 38.880100922392],
      },
      properties: {
        phoneFormatted: "(703) 522-2016",
        phone: "7035222016",
        address: "4075 Wilson Blvd",
        city: "Arlington",
        country: "United States",
        crossStreet: "at N Randolph St.",
        postalCode: "22203",
        state: "VA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.28784, 40.008008],
      },
      properties: {
        phoneFormatted: "(610) 642-9400",
        phone: "6106429400",
        address: "68 Coulter Ave",
        city: "Ardmore",
        country: "United States",
        postalCode: "19003",
        state: "PA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.20121216774, 39.954030175164],
      },
      properties: {
        phoneFormatted: "(215) 386-1365",
        phone: "2153861365",
        address: "3925 Walnut St",
        city: "Philadelphia",
        country: "United States",
        postalCode: "19104",
        state: "PA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.043959498405, 38.903883387232],
      },
      properties: {
        phoneFormatted: "(202) 331-3355",
        phone: "2023313355",
        address: "1901 L St. NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 19th St",
        postalCode: "20036",
        state: "D.C.",
      },
    },
  ],
};

const View = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.1734);
  const [lat, setLat] = useState(31.1048);
  const [zoom, setZoom] = useState(2);
  const [userInfo, setUserInfo] = useState(null);
  const [value, setValue] = React.useState(0);
  const [gptRes, setGptRes] = useState("");
  const [loader, setLoader] = useState(true);
  const params = useParams();

  let { id } = params;
  let selectedTrip = userInfo?.find((item) => item.id == id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let newArr = window.localStorage.getItem("trip-plain");
      let parsed = JSON.parse(newArr);
      setGptRes(parsed[0]?.chatgpt);
      setUserInfo(parsed);
      setLat(parsed[0]?.lat);
      setLng(parsed[0]?.long);
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
    const timer = setTimeout(() => {
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

      map.current.zoomTo(10, { duration: 10000 });
    }, 2000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const timer = setTimeout(() => {
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }, 2000);
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
            How would you rate this plan?
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            sx={{ mt: 1 }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
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
