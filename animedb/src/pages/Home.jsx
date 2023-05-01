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
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import Divider from "@mui/material/Divider";

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

const StyledSmall = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#87adfa",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledMedium = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e49eff;",
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
  const [topUsers, setTopUsers] = useState([]);
  const [topStudios, setTopStudios] = useState([]);
  const [Recommended , setRecommended ] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/topUsers");
        setTopUsers(res.data);
        // console.log(topUsers)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Studio queries are also in the anime route since they are a subset of anime
        const res = await axios.get("/anime/topStudios");
        setTopStudios(res.data);
        // console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/anime/recommended ");
        setRecommended(res.data);
        // console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div className="home">
      <div className="top-anime">
        <Divider
          variant="fullWidth"
          color="secondary"
          orientation="horizontal"
          sx={{ my: 2 }}
        />
        <Box
          border={3}
          borderRadius={5}
          borderColor="#f5f5f5"
          bgcolor="transparent"
          p={2}
          mb={4}
        >
          <h1
            style={{
              color: "#42a5f5",
              fontWeight: "bold",
              fontSize: "36px",
              margin: 0,
            }}
          >
            Top 10 anime
          </h1>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Japanese Name</StyledTableCell>
                <StyledTableCell align="center">Genre</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Stuidio</StyledTableCell>
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
                  <StyledTableCell align="center">
                    {anime.Genres}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {anime.Studios}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider
          variant="fullWidth"
          color="secondary"
          orientation="horizontal"
          sx={{ my: 2 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box
              border={3}
              borderRadius={5}
              borderColor="#f5f5f5"
              bgcolor="transparent"
              p={2}
              mb={4}
            >
              <h1
                style={{
                  color: "#de96fa",
                  fontWeight: "bold",
                  fontSize: "36px",
                  margin: 0,
                }}
              >
                Top 10 Studios
              </h1>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledMedium>Studio Name</StyledMedium>
                    <StyledMedium align="center">
                      Number of Audiance
                    </StyledMedium>
                    <StyledMedium align="center">Number of Shows</StyledMedium>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topStudios.map((studio) => (
                    <StyledTableRow key={studio.Studios}>
                      <StyledTableCell align="center">
                        {studio.Studios}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {studio.num_members}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {studio.num_shows}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
            <Box
              border={3}
              borderRadius={5}
              borderColor="#f5f5f5"
              bgcolor="transparent"
              p={2}
              mb={4}
            >
              <h1
                style={{
                  color: "#6e9cfa",
                  fontWeight: "bold",
                  fontSize: "36px",
                  margin: 0,
                }}
              >
                Top 10 Users
              </h1>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledSmall>User ID</StyledSmall>
                    <StyledSmall align="left">Total Episodes</StyledSmall>
                    <StyledSmall align="left">Total Anime</StyledSmall>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topUsers.map((topuser) => (
                    <StyledTableRow key={topuser.user_id}>
                      <StyledTableCell component="th" scope="row">
                        {topuser.user_id}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {topuser.total_watched_episodes}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {topuser.total_watched_anime}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Divider
          variant="fullWidth"
          color="secondary"
          orientation="horizontal"
          sx={{ my: 2 }}
        />

        <Box
          border={3}
          borderRadius={5}
          borderColor="#f5f5f5"
          bgcolor="transparent"
          p={2}
          mb={4}
        >
          <h1
            style={{
              color: "#42a5f5",
              fontWeight: "bold",
              fontSize: "36px",
              margin: 0,
            }}
          >
            Top Recommended TV Anime
          </h1>
        </Box>

        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledSmall>Name</StyledSmall>
                    <StyledSmall align="left">Rating</StyledSmall>
                    <StyledSmall align="left">Watching Users</StyledSmall>
                    <StyledSmall align="left">High-rating Users</StyledSmall>
                    <StyledSmall align="left">Average Rating</StyledSmall>
                    <StyledSmall align="left">Recommendation</StyledSmall>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Recommended.map((recommend) => (
                    <StyledTableRow key={recommend.user_id}>
                      <StyledTableCell component="th" scope="row">
                        {recommend.Name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {recommend.rating}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {recommend.watching_users}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {recommend.high_rating_users}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {recommend.average_rating}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {recommend.recommendation}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </div>
    </div>
  );
};
