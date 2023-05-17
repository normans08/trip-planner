import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

let jsonPattern = /\{[^]*\}/;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E8E8E8",
    color: "#222",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = ({ gptRes, tableLoader }) => {
  const [gptResponse, setGptResponse] = useState([]);
  let previousDay = "";

  useEffect(() => {
    if (gptRes) {
      let match = gptRes.match(jsonPattern);
      var jsonCode = match ? match[0] : [];
      let res = {};
      console.log("match: " + jsonCode, jsonCode.endsWith("{"));
      if (jsonCode) {
        try {
          res = JSON.parse(jsonCode);
          if (typeof res !== "object" || res === null) {
            throw new Error("Invalid JSON");
          }
          console.log("Parsed JSON:", res);
          setGptResponse(res);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle the case where JSON is incomplete
          try {
            // Add missing closing brackets and parentheses
            const fixedJsonCode = `${jsonCode.slice(0, -3) + "}]}"}`;
            console.log("fixedJsonCode", fixedJsonCode);
            res = JSON.parse(fixedJsonCode);
            console.log("res=================>", res);
            if (!Array.isArray(res.itinerary) || res.itinerary.length === 0) {
              throw new Error("Invalid JSON");
            }
            setGptResponse(res);

            console.log("Parsed incomplete JSON:", res);
          } catch (error) {
            console.error("Error parsing incomplete JSON:", error);
          }
        }
      }
    }
  }, [gptRes]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "70vh", overflow: "auto" }}
      >
        {" "}
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell width="90">Days</StyledTableCell>
              <StyledTableCell width="100" align="left">
                Time
              </StyledTableCell>
              <StyledTableCell width="300" align="left">
                Places
              </StyledTableCell>
              <StyledTableCell width="500" align="left">
                Recommendations
              </StyledTableCell>

              <StyledTableCell width="100" align="left">
                Price
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {gptResponse?.itinerary?.map((item, index) => {
              const { day } = item;
              const shouldRenderDay = day !== previousDay;
              previousDay = day;
              return (
                <>
                  {Array.isArray(gptResponse?.itinerary) ? (
                    <>
                      <StyledTableRow key={index}>
                        {shouldRenderDay ? (
                          <StyledTableCell>{day}</StyledTableCell>
                        ) : (
                          <StyledTableCell></StyledTableCell>
                        )}
                        <StyledTableCell width={300}>
                          {" "}
                          {item.time}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              p: 0.7,
                              borderRadius: "4px",
                              color: "#49abb8b5",
                              textAlign: "left",
                              // backgroundColor: "#ff000029",
                            }}
                          >
                            {item?.activity}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.recommendations}
                        </StyledTableCell>

                        <StyledTableCell>{item?.price}</StyledTableCell>
                      </StyledTableRow>
                    </>
                  ) : (
                    <>
                      {/* <StyledTableRow>
                        <StyledTableCell>{key}</StyledTableCell>
                        <StyledTableCell>{value["Exact Time"]}</StyledTableCell>
                        <StyledTableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              p: 0.7,
                              borderRadius: "4px",
                              color: "#49abb8b5",
                              textAlign: "center",
                              // backgroundColor: "#ff000029",
                            }}
                          >
                            {value?.Activity}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          {value?.Recommendations}
                        </StyledTableCell>
                        <StyledTableCell>{value?.Latitude}</StyledTableCell>
                        <StyledTableCell>{value?.Longitude}</StyledTableCell>
                        <StyledTableCell>{value?.Price} $</StyledTableCell>
                      </StyledTableRow> */}
                      Something is wrong !
                    </>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Index;
