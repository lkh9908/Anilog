import {db} from '../db.js'
import jwt from "jsonwebtoken";
// const user_id = localStorage.getItem('user_id')
export const getUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        const q = `SELECT
        *
        FROM Users U
        WHERE user_id = ?`
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json(data)
        })
    });
    
}   

export const topUsers = (req, res) => {
    const q = `SELECT user_id, SUM(watched_episodes) AS total_watched_episodes, COUNT(DISTINCT MAL_ID) AS total_watched_anime
    FROM OLDAnimelist
    GROUP BY user_id
    HAVING COUNT(DISTINCT MAL_ID) > 3 AND SUM(watched_episodes) >= 100
    ORDER BY total_watched_episodes DESC LIMIT 10`
    db.query(q, (err, data) => {
        if (err) return res.send(err)
        return res.status(200).json(data)
    })

    // return res.json(dummyData);
}   

const dummyData = [
    { user_id: 31, total_watched_episodes: 500, total_watched_anime: 20 },
    { user_id: 222, total_watched_episodes: 1000, total_watched_anime: 30 },
    { user_id: 133, total_watched_episodes: 200, total_watched_anime: 10 },
    { user_id: 546, total_watched_episodes: 1500, total_watched_anime: 40 },
    { user_id: 59, total_watched_episodes: 800, total_watched_anime: 25 },
    { user_id: 62, total_watched_episodes: 300, total_watched_anime: 15 },
    { user_id: 713, total_watched_episodes: 1200, total_watched_anime: 35 },
    { user_id: 124, total_watched_episodes: 600, total_watched_anime: 20 },
    { user_id: 589, total_watched_episodes: 100, total_watched_anime: 5 },
    { user_id: 110, total_watched_episodes: 400, total_watched_anime: 15 }
  ];
  

  