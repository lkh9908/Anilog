import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
    <div style={{ backgroundColor: "#F6EEF3", padding: "20px" }}>
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

      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Aired: {anime.Aired} | Premiered: {anime.Premiered}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Producers: {anime.Producers}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Licensors: {anime.Licensors}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Studios: {anime.Studios}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Source: {anime.Source}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px", marginBottom: "5px" }}>
        Duration: {anime.Duration}
      </p>
      <p style={{ color: "#7A6C84", fontSize: "16px" }}>
        Rating: {anime.Rating}
      </p>
    </div>
  );
};
