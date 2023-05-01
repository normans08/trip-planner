import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
// import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../images/index";

const ListPlanner = () => {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState(null);
  const router = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let newArr = window.localStorage.getItem("trip-plain");
      let parsed = JSON.parse(newArr);
      setUserInfo(parsed);
    }
  }, []);

  const redirect = (id) => {
    router({
      pathname: `/listPlanner/${id}`,
      //   query: { id: id },
    });
  };
  const redirectToHome = (id) => {
    router({
      pathname: `/`,
      //   query: { id: id },
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <div className="image-holders">
        <img src={Logo} alt="logo" />
        <h1>TRAVEL SMARTER, NOT HARDER</h1>
        <p>
          Save time, explore more: Let our advanced AI navigate the complexities
          of trip planning, so you can focus on making memories.​
        </p>
      </div>
      <Box sx={{ pl: 7, pt: 3, width: "60%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ fontWeight: "600", mb: 3 }}>
            {`Hii, ${userInfo ? userInfo[0]?.name : ""} Wellcome`}
          </Typography>
          <Button
            onClick={redirectToHome}
            variant="outlined"
            sx={{ mr: 2, height: "40px" }}
          >
            + Add more
          </Button>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "500" }}>
          {" "}
          Check out your plans:
        </Typography>

        <Box sx={{ mt: 7, pr: 1, width: "100%" }}>
          {userInfo?.map((item, index) => (
            <Card
              className="activeCard"
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                gap: 3,
                mb: 3,
                flexDirection: "column",
                justifyContent: "center",
                border: "2px solid #dadada",
                borderRadius: "10px !important",
                boxShadow: "none",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#9b9b9b" }}>
                    Name
                  </Typography>
                  <Typography>{item?.name ?? "N/A"}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#9b9b9b" }}>
                    Destination
                  </Typography>
                  <Typography sx={{ wordBreak: "break-all", width: "100%" }}>
                    {item?.destination?.label}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#9b9b9b" }}>
                    Created date
                  </Typography>
                  <Typography>{item?.date ?? "N/A"}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#9b9b9b" }}>
                    Trip Duration
                  </Typography>
                  <Typography>{item?.days ?? "N/A"} days</Typography>
                </Box>

                {item?.id && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => redirect(item?.id)}
                      disabled={item?.id ? false : true}
                      sx={{
                        background:
                          "linear-gradient(41.74deg, #4596FF 1.22%, #4DBADC 51.14%, #51CEC8 99.12%)",
                        ":disabled": {
                          bgcolor: theme.palette.warning.main, // theme.palette.primary.main
                          color: "white",
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ListPlanner;
