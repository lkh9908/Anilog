import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

export const Anime = () => {
  const [anime, setAnime] = useState({});
  const location = useLocation();
  const animeId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/anime/${animeId}`);
        setAnime(res.data[0]);
        console.log(animeId);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [animeId]);

  return (
    <div style={{ backgroundColor: "#fffcfe", padding: "20px" }}>
      <h1 style={{ color: "#FE7F2D", fontSize: "24px", marginBottom: "10px" }}>
        {anime.Name}
      </h1>
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
