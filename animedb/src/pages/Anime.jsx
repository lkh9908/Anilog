import React, { useState, useEffect } from "react";

export const Anime = () => {
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    // Here you would fetch the anime data from a server using a library like axios or fetch
    // and then update the animeData state variable with the fetched data
    // For this example, we'll just set the animeData manually
    const data = {
      name: "Fullmetal Alchemist: Brotherhood",
      score: 9.19,
      genres: "Action, Adventure, Drama, Fantasy, Magic, Military, Shounen",
      english_name: "Fullmetal Alchemist: Brotherhood",
      japanese_name: "鋼の錬金術師",
      type: "TV",
      episode: 64,
      aired: "Apr 5, 2009 to Jul 4, 2010",
      premiered: "Spring 2009",
      producers: "Aniplex, Square Enix, Mainichi Broadcasting System, Studio Moriken",
      licensors: "Funimation",
      studios: "Bones",
      source: "Manga",
      duration: "24 min. per ep.",
      rating: "R - 17+ (violence & profanity)",
    };
    setAnimeData(data);
  }, []);

  if (!animeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{animeData.name}</h1>
      <p>
        Score: {animeData.score} | Genres: {animeData.genres} | Type: {animeData.type} | Episodes: {animeData.episode}
      </p>
      <p>English Name: {animeData.english_name}</p>
      <p>Japanese Name: {animeData.japanese_name}</p>
      <p>Aired: {animeData.aired} | Premiered: {animeData.premiered}</p>
      <p>Producers: {animeData.producers}</p>
      <p>Licensors: {animeData.licensors}</p>
      <p>Studios: {animeData.studios}</p>
      <p>Source: {animeData.source}</p>
      <p>Duration: {animeData.duration}</p>
      <p>Rating: {animeData.rating}</p>
    </div>
  );
}

