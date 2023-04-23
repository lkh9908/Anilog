import React, { useState } from "react";

export const WatchList = () => {
  const [animeList, setAnimeList] = useState([
    {
      id: 1,
      name: "Attack on Titan",
      score: 8.9,
      episodes: 75,
      status: "Watching",
    },
    {
      id: 2,
      name: "One Piece",
      score: 9.0,
      episodes: 1000,
      status: "Plan to Watch",
    },
    {
      id: 3,
      name: "Naruto",
      score: 8.3,
      episodes: 720,
      status: "Completed",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddButtonClick = () => {
    const newAnime = {
      id: animeList.length + 1,
      name: "New Anime",
      score: 0,
      episodes: 0,
      status: "Plan to Watch",
    };
    setAnimeList([...animeList, newAnime]);
  };

  const handleDeleteButtonClick = (id) => {
    const filteredList = animeList.filter((anime) => anime.id !== id);
    setAnimeList(filteredList);
  };

  const filteredAnimeList = animeList.filter((anime) =>
    anime.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Watchlist</h1>
      <input type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search anime by name" />
      <button onClick={handleAddButtonClick}>Add Anime</button>
      <ul>
        {filteredAnimeList.map((anime) => (
          <li key={anime.id}>
            <h2>{anime.name}</h2>
            <p>Score: {anime.score}</p>
            <p>Episodes: {anime.episodes}</p>
            <p>Status: {anime.status}</p>
            <button onClick={() => handleDeleteButtonClick(anime.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

