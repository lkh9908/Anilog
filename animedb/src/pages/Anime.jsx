import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export const Anime = () => {
  const [anime, setAnime] = useState({});
  const location = useLocation();
  const animeId = location.pathname.split("/")[2];
  const [cls, setCls] = useState("green");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/anime/${animeId}`);
        setAnime(res.data[0]);
        // console.log(animeId);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [animeId]);

  async function addClicked(e) {
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
        <label for="episodes-input">Watched Episodes (0 - ${anime.Episode}): </label>
        <input id="episodes-input" type="number" min="0" max=${anime.Episode} class="swal2-input">
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
          `/watchList/${animeId}/${rating}/${watchingStatus}/${watchedEpisodes}`
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ backgroundColor: "#fffcfe", padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{ color: "#FE7F2D", fontSize: "24px", marginBottom: "10px" }}
        >
          {anime.Name}
        </h1>
        <style>
          {`
                        .red {
                        background-color: gray;
                        pointer-events: none;
                        display: none;
                        margin-left: 2rem;
                        }
                        .green {
                        background-color: primary;
                        margin-left: 2rem;
                        }
                    `}
        </style>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => addClicked(e)}
          className={cls}
        >
          Add
        </Button>
      </div>
      <p
        style={{
          color: "#fff",
          backgroundColor: "#87adfa",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        Score: {anime.Score} | Genres: {anime.Genres} | Type: {anime.Type} |
        Episodes: {anime.Episode}
      </p>
      <p
        style={{
          color: "#7A6C84",
          fontSize: "16px",
          marginBottom: "10px",
          padding: "10px",
          border: "2px solid #7A6C84",
          fontStyle: "italic",
        }}
      >
        Original Name: {anime.Japanese_name}
      </p>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Aired:</span> {anime.Aired} |{" "}
            <span style={{ fontWeight: "bold" }}>Premiered:</span>{" "}
            {anime.Premiered}
          </p>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Producers:</span>{" "}
            {anime.Producers}
          </p>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Licensors:</span>{" "}
            {anime.Licensors}
          </p>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Studios:</span> {anime.Studios}
          </p>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Source:</span> {anime.Source}
          </p>
          <p
            style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}
          >
            <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
            {anime.Duration}
          </p>
          <p style={{ color: "#7A6C84", fontSize: "16px" }}>
            <span style={{ fontWeight: "bold" }}>Rating:</span> {anime.Rating}
          </p>
        </Grid>
        <Grid item xs={5}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                color: "#7A6C84",
                fontSize: "18px",
                lineHeight: "1.3",
                marginBottom: "0.5em",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Synopsis:</span>
            </p>
            <p
              style={{ color: "#7A6C84", fontSize: "16px", lineHeight: "1.3" }}
            >
              <span style={{ marginLeft: "0.5em" }}>{anime.Synopsis}...</span>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
