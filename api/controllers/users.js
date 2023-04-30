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