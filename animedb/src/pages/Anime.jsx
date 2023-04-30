import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


export const Anime = () => {
  const [anime, setAnime] = useState({})
  const location = useLocation()
  const animeId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/anime/$(animeId)`)
        setAnime(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [animeId])
    
  //   const data = {
  //     name: "Fullmetal Alchemist: Brotherhood",
  //     score: 9.19,
  //     genres: "Action, Adventure, Drama, Fantasy, Magic, Military, Shounen",
  //     english_name: "Fullmetal Alchemist: Brotherhood",
  //     japanese_name: "鋼の錬金術師",
  //     type: "TV",
  //     episode: 64,
  //     aired: "Apr 5, 2009 to Jul 4, 2010",
  //     premiered: "Spring 2009",
  //     producers: "Aniplex, Square Enix, Mainichi Broadcasting System, Studio Moriken",
  //     licensors: "Funimation",
  //     studios: "Bones",
  //     source: "Manga",
  //     duration: "24 min. per ep.",
  //     rating: "R - 17+ (violence & profanity)",
  //   };
  //   setAnimeData(data);
  // }, []);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{anime.name}</h1>
      <p>
        Score: {anime.score} | Genres: {anime.genres} | Type: {anime.type} | Episodes: {anime.episode}
      </p>
      <p>English Name: {anime.english_name}</p>
      <p>Japanese Name: {anime.japanese_name}</p>
      <p>Aired: {anime.aired} | Premiered: {anime.premiered}</p>
      <p>Producers: {anime.producers}</p>
      <p>Licensors: {anime.licensors}</p>
      <p>Studios: {anime.studios}</p>
      <p>Source: {anime.source}</p>
      <p>Duration: {anime.duration}</p>
      <p>Rating: {anime.rating}</p>
    </div>
  );
}

