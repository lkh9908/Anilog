import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Slider,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cls, setCls] = useState("green");
  async function search() {
    if (searchQuery == "") return;
    try {
      const res = await axios.get(`/anime/${searchQuery}`);
      // console.log(res.data);
      setSearchData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addClicked(e, MAL_ID, episodes) {
    // console.log(MAL_ID, episodes);
    e.target.className = "red";
    // Prompt for watching status and watched episodes
    const { value: formValues } = await Swal.fire({
      title: "Add to Anime List",
      html: `<label for="status-select">Watching Status</label>
        <select id="status-select" class="swal2-select">
          <option value="1">Currently Watching</option>
          <option value="2">Completed</option>
          <option value="3">On Hold</option>
          <option value="4">Dropped</option>
          <option value="5">Plan to Watch</option>
        </select>
        <label for="episodes-input">Watched Episodes (0 - ${episodes}): </label>
        <input id="episodes-input" type="number" min="0" max=${episodes} class="swal2-input">
        <br/>
        <label for="rating-input">Rate the Anime (0 - 10): </label>
        <input id="rating-input" type="number" min="0" max="10" class="swal2-input">`,

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("status-select").value,
          document.getElementById("rating-input").value,
          document.getElementById("episodes-input").value,
        ];
      },
    });

    // Get values from the prompt
    const watchedEpisodes = document.getElementById("episodes-input").value
      ? document.getElementById("episodes-input").value
      : 0;
    const watchingStatus = document.getElementById("status-select").value;
    const rating = document.getElementById("rating-input").value;

    // console.log(rating, watchedEpisodes, watchingStatus)

    // Add code to push data to backend
    try {
      console.log(
        await axios.post(
          `/watchList/${MAL_ID}/${rating}/${watchingStatus}/${watchedEpisodes}`
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  // filter
  const [selectedGenre, setSelectedGenre] = useState(defaultGenres[0]);
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(rating[0]);
  const [selectedStudio, setSelectedStudio] = useState(studios[0]);
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [filterResult, setFilterResult] = useState([]);
  async function handleFilter() {
    // console.log("Selected Genre:", selectedGenre);
    // console.log("Score Range:", scoreRange);
    // console.log("Rating Range:", selectedRating);
    // console.log("Studio Range:", selectedStudio);
    // console.log("Source:", selectedSource);
    // Perform filtering logic here

    try {
      const res = await axios.get(
        `/anime/${selectedGenre}/${scoreRange[0]}/${scoreRange[1]}/${selectedRating}/${selectedStudio}/${selectedSource}`
      );
      // console.log(res.data);
      setFilterResult(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRowsSearch =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchData.length) : 0;

  const emptyRowsFilter =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterResult.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <form>
      <h1>Search anime</h1>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <TextField
          id="search-bar"
          style={{ marginRight: "10px", width: "100%" }}
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Enter an anime name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          style={{ padding: "1rem", backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={search}
        >
          Search
        </IconButton>
      </div>

      <Divider
        variant="fullWidth"
        color="secondary"
        orientation="horizontal"
        sx={{ my: 2 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="anime table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#e8d7ff",
              }}
            >
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Original Name
              </TableCell>

              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Add
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? searchData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : searchData
            ).map((row) => (
              <TableRow key={row.MAL_ID}>
                <TableCell style={{ width: 600 }} align="center">
                  <Link to={`/anime/${row.MAL_ID}`}>{row.Name}</Link>
                </TableCell>
                <TableCell style={{ width: 600 }} align="center">
                  {row.Japanese_name}
                </TableCell>
                <TableCell align="center">
                  <style>
                    {`
                        .red {
                        background-color: gray;
                        pointer-events: none;
                        display: none;
                        }
                        .green {
                        background-color: primary;
                        }
                    `}
                  </style>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => addClicked(e, row.MAL_ID, row.Episode)}
                    className={cls}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRowsSearch > 0 && (
              <TableRow style={{ height: 53 * emptyRowsSearch }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={searchData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <h1>Filter anime</h1>
        <div style={{ marginTop: "1rem" }}>
          <Typography gutterBottom>Genre:</Typography>
          <Autocomplete
            id="genre-filter"
            options={defaultGenres}
            value={selectedGenre}
            onChange={(event, newValue) => {
              setSelectedGenre(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select a genre"
              />
            )}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Typography gutterBottom>Score Range:</Typography>
          <Slider
            value={scoreRange}
            onChange={(event, newValue) => {
              setScoreRange(newValue);
            }}
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={10}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Typography gutterBottom>Rating:</Typography>
          <Autocomplete
            id="rating-filter"
            options={rating}
            value={selectedRating}
            onChange={(event, newValue) => {
              setSelectedRating(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select a rating"
              />
            )}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Typography gutterBottom>Studio:</Typography>
          <Autocomplete
            id="studio-filter"
            options={studios}
            value={selectedStudio}
            onChange={(event, newValue) => {
              setSelectedStudio(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select a studio"
              />
            )}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Typography gutterBottom>Source:</Typography>
          <Autocomplete
            id="source-filter"
            options={sources}
            value={selectedSource}
            onChange={(event, newValue) => {
              setSelectedSource(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select a source"
              />
            )}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          style={{ marginTop: "1rem" }}
        >
          Filter
        </Button>

        <Divider
          variant="fullWidth"
          color="secondary"
          orientation="horizontal"
          sx={{ my: 2 }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="anime table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "#e8d7ff",
                }}
              >
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Original Name
                </TableCell>

                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Add
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filterResult.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filterResult
              ).map((row) => (
                <TableRow key={row.MAL_ID}>
                  <TableCell style={{ width: 600 }} align="center">
                    <Link to={`/anime/${row.MAL_ID}`}>{row.Name}</Link>
                  </TableCell>
                  <TableCell style={{ width: 600 }} align="center">
                    {row.Japanese_name}
                  </TableCell>
                  <TableCell align="center">
                    <style>
                      {`
                        .red {
                        background-color: gray;
                        pointer-events: none;
                        display: none;
                        }
                        .green {
                        background-color: primary;
                        }
                    `}
                    </style>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => addClicked(e, row.MAL_ID, row.Episode)}
                      className={cls}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRowsFilter > 0 && (
                <TableRow style={{ height: 53 * emptyRowsFilter }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={filterResult.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </form>
  );
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// default values

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
];

const defaultGenres = [
  "ALL",
  "Action",
  "Comedy",
  "Drama",
  "Game",
  "Sci-Fi",
  "Harem",
  "Adventure",
  "Slice of Life",
  "Military",
  "Space",
  "Music",
  "Mecha",
  "Supernatural",
  "Historical",
  "Mystery",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Dementia",
  "Psychological",
  "Sports",
  "Demons",
  "Magic",
  "Kids",
  "Romance",
  "Thriller",
  "Seinen",
  "School",
  "Martial Arts",
  "Super Power",
  "Cars",
];

const studios = [
  "ALL",
  "Sunrise",
  "Madhouse",
  "J.C.Staff",
  "Studio Pierrot",
  "Trans Arts",
  "Studio Comet",
  "Gonzo",
  "Gainax, Tatsunoko Production",
  "OLM",
  "Gallop, Studio Deen",
  "Bee Train",
  "AIC",
  "Bones",
  "Xebec",
  "Daume",
  "Nomad",
  "Kyoto Animation",
  "Group TAC",
  "Seven Arcs",
  "Asread",
  "Sunrise, Studio Deen",
  "Sunrise, Nakamura Production",
  "Hal Film Maker",
  "Studio Deen",
  "Nippon Animation",
  "Production I.G",
  "Studio Matrix",
  "feel.",
  "TNK",
  "Gainax, J.C.Staff",
  "Gainax, Shaft",
  "Studio Fantasia",
  "Toei Animation",
  "Production Reed",
  "Gallop, Studio Comet",
  "Pastel",
  "Manglobe",
  "Arms",
  "ufotable",
  "Chaos Project, GANSIS",
  "Palm Studio",
  "AIC Spirits",
  "Shin-Ei Animation",
  "Imagin, Studio Live",
  "TMS Entertainment",
  "A.C.G.T.",
  "Radix",
  "Gainax, Madhouse",
  "Studio Fantasia, Amber Film Works",
  "E&G Films",
  "Tokyo Movie Shinsha",
  "Triangle Staff",
  "Magic Bus",
  "Group TAC, Japan Vistec",
  "AIC ASTA",
  "G&G Entertainment",
  "Gonzo, Production I.G",
  "Plum, Magic Bus",
  "Artland",
  "Satelight, Production Reed",
  "Gallop",
  "Brain's Base",
  "Shaft",
  "Trinet Entertainment",
  "Actas, SynergySP",
  "OLM, Production Reed",
  "Madhouse, Studio Deen",
  "Tatsunoko Production",
  "Studio Junio",
  "Trinet Entertainment, Picture Magic",
  "Satelight",
  "Studio Hibari",
  "Studio Flag",
  "Tokyo Kids",
  "Group TAC, Ginga Ya",
  "Planet",
  "Studio Live",
  "Triangle Staff, Studio Wombat",
  "Madhouse, Imagin",
  "Studio 4°C",
  "Studio Hibari, Production Reed",
  "AIC Spirits, Group TAC",
  "Gonzo, Satelight",
  "Production I.G, Production Reed",
  "AIC, APPP",
  "Group TAC, Amuse",
  "Gainax",
  "Studio Pierrot, Studio Deen",
  "Plum",
  "Tezuka Productions",
  "Studio Junio, Annapuru",
  "APPP",
  "Zexcs",
  "Yumeta Company",
  "Ishimori Entertainment",
  "Shaft, Brain's Base, Japan Vistec",
  "Ginga Ya",
  "Telecom Animation Film",
  "Genco, Radix",
  "Phoenix Entertainment",
  "AIC Spirits, BeSTACK",
  "SynergySP",
  "P.A. Works",
  "A-1 Pictures",
  "Remic",
  "Studio Comet, Studio Sign",
  "Trinet Entertainment, Studio Kyuuma",
  "Bee Train, Cookie Jar Entertainment",
  "Production I.G, Tatsunoko Production",
  "Mushi Production",
  "Telescreen",
  "Panmedia, Meruhensha",
  "Doga Kobo",
  "Imagin",
  "Diomedéa",
  "Gonzo, AIC",
  "White Fox",
  "A-1 Pictures, Ordet",
  "Nippon Animation, SynergySP, Shirogumi",
  "The Answer Studio",
  "Tatsunoko Production, Studio World",
  "Gainax, feel.",
  "AIC Spirits, Asread",
  "Madhouse, Tatsunoko Production",
  "Brain's Base, Marvy Jack",
  "Bee Media, Code",
  "David Production",
  "AIC PLUS+",
  "Bones, Kinema Citrus",
  "SILVER LINK.",
  "Hoods Entertainment",
  "Satelight, A-1 Pictures",
  "Hal Film Maker, TYO Animations",
  "AIC Build",
  "8bit",
  "GoHands",
  "Pierrot Plus",
  "Studio Gokumi",
  "Studio Pierrot, David Production",
  "Satelight, 8bit",
  "Barnum Studio, Project No.9, Studio Blan",
  "Satelight, ixtl",
  "J.C.Staff, Artland",
  "Kinema Citrus",
  "Satelight, Encourage Films",
  "Gainax, Asahi Production",
  "Madhouse, Studio Gokumi",
  "Gonzo, DLE",
  "Tezuka Productions, MAPPA",
  "Actas",
  "AIC Classic",
  "Doga Kobo, Orange",
  "Hoods Entertainment, Production IMS",
  "Wit Studio",
  "Bridge",
  "Lerche",
  "Project No.9",
  "Hoods Entertainment, Felix Film",
  "SILVER LINK., Connect",
  "Kyoto Animation, Animation Do",
  "Trigger",
  "Hoods Entertainment, teamKG",
  "SANZIGEN",
  "Tatsunoko Production, Ordet",
  "Production IMS",
  "ILCA",
  "Polygon Pictures",
  "NAZ",
  "Kinema Citrus, Orange",
  "C-Station",
  "MAPPA",
  "A-1 Pictures, Bridge",
  "Project No.9, Tri-Slash",
  "Studio Ghibli, Polygon Pictures",
  "LIDENFILMS",
  "A-1 Pictures, TROYCA",
  "Shuka",
  "Studio 3Hz",
  "Passione",
  "TYO Animations",
  "Seven Arcs Pictures",
  "J.C.Staff, SANZIGEN",
  "TMS Entertainment, Telecom Animation Fil",
  "Shirogumi, Encourage Films",
  "SANZIGEN, LIDENFILMS",
  "Seven",
  "Telecom Animation Film, Graphinica",
  "Bandai Namco Pictures",
  "EMT Squared",
  "TMS Entertainment, 3xCube",
  "Kinema Citrus, White Fox",
  "MAPPA, Studio VOLN",
  "TROYCA",
  "SILVER LINK., Nexus",
  "Nexus",
  "Lay-duce",
  "Orange, Studio 3Hz",
  "Brain's Base, Platinum Vision",
  "Hoods Drifters Studio",
  "M.S.C",
  "CygamesPictures",
  "Madhouse, TMS Entertainment",
  "Kinema Citrus, EMT Squared",
  "Barnum Studio, Project No.9",
  "Studio Gokumi, AXsiZ",
  "Millepensee, GEMBA",
  "Nut",
  "Gathering",
  "Haoliners Animation League",
  "J.C.Staff, Egg Firm",
  "WAO World",
  "TMS Entertainment, Shin-Ei Animation",
  "Ajia-Do",
  "Satelight, C2C",
  "Encourage Films",
  "Platinum Vision",
  "Artland, TNK",
  "Zero-G",
  "Gathering, Lesprit",
  "Pine Jam",
  "Project No.9, A-Real",
  "Studio Pierrot, Pierrot Plus",
  "Graphinica",
  "Actas, Studio 3Hz",
  "Shirogumi, EMT Squared",
  "Children's Playground Entertainment",
  "Kamikaze Douga",
  "CloverWorks",
  "Orange",
  "Diomedéa, Studio Blanc",
  "Emon, Blade",
  "GEEK TOYS",
  "A-1 Pictures, Trigger, CloverWorks",
  "A-1 Pictures, Bridge, CloverWorks",
  "Studio Flad",
  "Geno Studio",
  "AXsiZ",
  "Asread, White Fox",
  "MAPPA, Lapin Track",
  "DandeLion Animation Studio",
  "Lesprit",
  "Acca effe, Giga Production",
  "Asahi Production",
  "Ascension, Creators in Pack, Zero-G",
  "Silver, Arvo Animation",
  "WAO World, GEMBA",
  "J.C.Staff, A.C.G.T.",
  "Connect",
  "Felix Film",
  "ENGI",
  "P.A. Works, Studio 3Hz",
  "Seven, GEEK TOYS",
  "Studio Bind",
  "Anima&Co.",
  "HOTZIPANG",
  "Studio A-CAT",
  "Studio PuYUKAI",
  "Ezόla",
  "C2C",
  "Maho Film",
  "LIDENFILMS, Felix Film",
];

const rating = [
  "ALL",
  "R - 17+ (violence & profanity)",
  "PG-13 - Teens 13 or older",
  "R+ - Mild Nudity",
  "G - All Ages",
  "PG - Children",
];

const sources = [
  "ALL",
  "Original",
  "Manga",
  "4-koma manga",
  "Light novel",
  "Visual novel",
  "Novel",
  "Other",
  "Game",
  "Card game",
  "Book",
  "Web manga",
  "Music",
  "Digital manga",
];
