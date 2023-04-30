import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Divider from "@mui/material/Divider";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cls, setCls] = useState("green");
  async function search() {
    try {
      const res = await axios.get(`/anime/${searchQuery}`);
      console.log(res.data);
      setSearchData(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  async function addClicked(e, MAL_ID) {
    console.log(MAL_ID);
  
    // Prompt for watching status and watched episodes
    const { value: formValues } = await Swal.fire({
        title: "Add to Anime List",
        html:
        `<label for="status-select">Watching Status</label>
        <select id="status-select" class="swal2-select">
          <option value="1">Currently Watching</option>
          <option value="2">Completed</option>
          <option value="3">On Hold</option>
          <option value="4">Dropped</option>
          <option value="5">Plan to Watch</option>
        </select>
        <label for="episodes-input">Watched Episodes</label>
        <input id="episodes-input" type="number" min="0" max="99999" class="swal2-input">
        <br/>
        <label for="rating-input">Rate the Anime</label>
        <input id="rating-input" type="number" min="0" max="10" class="swal2-input">`,
        
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("status-select").value,
            document.getElementById("rating-input").value,
            document.getElementById("episodes-input").value
          ];
        }
      });
  
    // Get values from the prompt
    const watchedEpisodes = document.getElementById("episodes-input").value ? document.getElementById("episodes-input").value : 0;
    const watchingStatus = document.getElementById("status-select").value;
    const rating = document.getElementById("rating-input").value;

    console.log(rating, watchedEpisodes, watchingStatus)
  
    // Add code to push data to backend
    try {
        console.log(await axios.post(`/watchList/${MAL_ID}/${rating}/${watchingStatus}/${watchedEpisodes}`));
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a anime name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton aria-label="search" onClick={search}>
        Search
      </IconButton>

      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Japanese Name</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {searchData.length > 0 ? (
            searchData.map((anime) => (
              <tr key={anime.MAL_ID}>
                <td>{anime.Name}</td>
                <td>{anime.Japanese_name}</td>
                <td>
                  <button onClick={() => console.log('add')}>Add</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results found</td>
            </tr>
          )}
        </tbody>
      </table> */}
      <Divider
        variant="fullWidth"
        color="secondary"
        orientation="horizontal"
        sx={{ my: 2 }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="Anime table">
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
                Japanese Name
              </TableCell>

              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Add
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData.length > 0 ? (
              searchData.map((anime) => (
                <TableRow key={anime.MAL_ID}>
                  <TableCell component="th" scope="row" align="center">
                    {anime.Name}
                  </TableCell>
                  <TableCell align="center">{anime.Japanese_name}</TableCell>
                  <TableCell align="center">
                    <style>
                      {`
                        .red {
                        background-color: gray;
                        pointer-events: none;
                        }
                        .green {
                        background-color: primary;
                        }
                    `}
                    </style>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => addClicked(e, anime.MAL_ID)}
                      className={cls}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3">No results found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Autocomplete
        id="size-small-standard"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={top100Films[13]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Size small"
            placeholder="Favorites"
          />
        )}
      /> */}
    </form>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];
