import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// top 10 anime saved on a different table

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
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


export const Home = () => {
  const [top10, settop10] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/anime/top10");
        settop10(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <div className="home">
      <div className="top-anime">
        <h1>Top 10 anime</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Japanese Name</StyledTableCell>
                <StyledTableCell align="center">Genre</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">
                  Stuidio
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {top10.map((anime) => (
                <StyledTableRow key={anime.MAL_ID}>
                  <StyledTableCell component="th" scope="row">
                  <Link to={`/anime/${anime.MAL_ID}`}>{anime.Name}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {anime.Japanese_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{anime.Type}</StyledTableCell>
                  <StyledTableCell align="center">{anime.Genres}</StyledTableCell>
                  <StyledTableCell align="center">{anime.Studios}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
