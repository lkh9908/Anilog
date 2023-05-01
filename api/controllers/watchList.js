import { db } from "../db.js";
import jwt from "jsonwebtoken";
// const user_id = localStorage.getItem('user_id')
export const getList = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT
        L.user_id, L.MAL_id, L.rating, L.watching_status, L.watched_episodes, A.Name, A.Japanese_name, A.Episode, W.description
        FROM AnimelistNew L 
        JOIN Anime A on L.MAL_ID = A.MAL_ID
        JOIN WatchingStatus W on L.watching_status = W.status
        WHERE user_id = ?`;
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};

export const addList = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const MAL_ID = req.params.id;
    const rating = req.params.rating;
    const status = req.params.watchingStatus;
    const episodes = req.params.watchedEpisodes;
    console.log("updating");
    const q =
      "INSERT INTO AnimelistNew (user_id,MAL_ID,rating,watching_status,watched_episodes) VALUES (?, ?, ?, ?,?)";

    db.query(
      q,
      [userInfo.id, MAL_ID, rating, status, episodes],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      }
    );
  });
};

export const deleteList = (req, res) => {
  console.log("deleting");
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const MAL_ID = req.params.id;

    const q = "DELETE FROM AnimelistNew WHERE user_id = ? AND MAL_ID = ?";

    db.query(q, [userInfo.id, MAL_ID], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const updateList = (req, res) => {};
