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
import Skeleton from "@mui/material/Skeleton";

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

  useEffect(() => {
    if (gptRes) {
      let res = JSON?.parse(gptRes?.content);
      setGptResponse(res);
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
            {Object.entries(gptResponse).map(([key, value]) => {
              return (
                <>
                  {Array.isArray(value) ? (
                    <>
                      <TableRow key={key}>
                        <TableCell rowSpan={value.length + 1}>{key}</TableCell>
                      </TableRow>
                      {value.map((detail, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            {" "}
                            {detail["Exact Time"]}
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
                              {detail?.Activity}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            {detail?.Recommendations}
                          </StyledTableCell>

                          <StyledTableCell>{detail?.Price} $</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      <StyledTableRow>
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
                      </StyledTableRow>
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
