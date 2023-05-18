import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const jsonPattern = /\{[^]*\}/;

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

      if (jsonCode) {
        try {
          res = JSON.parse(jsonCode);
          if (typeof res !== "object" || res === null) {
            throw new Error("Invalid JSON");
          }
          setGptResponse(res);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          try {
            let fixedJsonCode = "";
            if (!jsonCode.endsWith("}")) {
              fixedJsonCode = `${jsonCode.slice(0, -3) + "}]}"}`;
            } else {
              fixedJsonCode = `${jsonCode.slice(0, -3) + "]}"}`;
            }
            let againMatchLength = fixedJsonCode?.split("]}").length;
            let againMatch = fixedJsonCode?.split("]")[againMatchLength - 1];
            let test = `${againMatch.slice(0, -3) + "]}"}`;

            console.log("fixedJsonCode", againMatch);
            let match2 = test.match(jsonPattern);
            console.log("match", match2[0]);
            res = JSON.parse(match2[0]);
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
    <TableContainer component={Paper} sx={{ height: "70vh", overflow: "auto" }}>
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
            const { day, time, activity, recommendations, price } = item;
            const shouldRenderDay = day !== previousDay;
            previousDay = day;
            return (
              <StyledTableRow key={index}>
                {shouldRenderDay && <StyledTableCell>{day}</StyledTableCell>}
                {!shouldRenderDay && <StyledTableCell></StyledTableCell>}
                <StyledTableCell width={300}>{time}</StyledTableCell>
                <StyledTableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      p: 0.7,
                      borderRadius: "4px",
                      color: "#49abb8b5",
                      textAlign: "left",
                    }}
                  >
                    {activity}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>{recommendations}</StyledTableCell>
                <StyledTableCell>{price}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Index;
