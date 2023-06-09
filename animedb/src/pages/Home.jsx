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
import TablePagination from "@mui/material/TablePagination";
import Divider from "@mui/material/Divider";

import Logo from "../img/cat_logo.png";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";

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

const StyledLast = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff8c8c",
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
  const [Recommended, setRecommended] = useState([]);

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
        const res = await axios.get("/anime/recommended");
        setRecommended(res.data);
        // console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  // for recommendation, with page number

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="home">

      <div style={{ textAlign: 'center' }}>
        <img src={Logo} alt="My Image" className="home-image"></img>
      </div>

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
            Top 10 anime By Score
          </h1>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Original Name</StyledTableCell>
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

        <div style={{ textAlign: 'center' }}>
          <img src={img1} alt="My Image" className="home-image"></img>
        </div>

        <Divider
          variant="fullWidth"
          color="secondary"
          orientation="horizontal"
          sx={{ my: 2 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
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
          <Grid item xs={12}  md={5}>
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
                    <StyledSmall align="left">Total Anime</StyledSmall>
                    <StyledSmall align="left">Total Episodes</StyledSmall>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topUsers.map((topuser) => (
                    <StyledTableRow key={topuser.user_id}>
                      <StyledTableCell component="th" scope="row">
                        {topuser.user_id}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {topuser.total_watched_anime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {topuser.total_watched_episodes}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        
        <div style={{ textAlign: 'center' }}>
          <img src={img2} alt="My Image" className="home-image"></img>
        </div>
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

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledLast align="left">Name</StyledLast>
                  <StyledLast align="left">Original Name</StyledLast>
                  <StyledLast align="center">User Interested</StyledLast>
                  <StyledLast align="center">High Rated Users</StyledLast>
                  <StyledLast align="center">Average Rating</StyledLast>
                  <StyledLast align="center">Recommendation</StyledLast>
                </TableRow>
              </TableHead>
              <TableBody>
                {Recommended.map((recommend) => (
                  <StyledTableRow key={recommend.MAL_ID}>
                    <StyledTableCell>
                      <Link to={`/anime/${recommend.MAL_ID}`}>{recommend.Name}</Link>
                    </StyledTableCell>
                    <StyledTableCell>{recommend.Japanese_name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {recommend.interested_users}
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
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Recommended.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </div>
    </div>
  );
};
