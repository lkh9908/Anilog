
import {db} from "../db.js"


export const getTop10 = (req, res) => {
    const q = `SELECT * FROM TopTen`
        db.query(q, (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json(data)
    })
}


export const getAnime = (req, res) => {
    const q = `SELECT * FROM Anime WHERE MAL_ID = ? OR Name LIKE ?`;
    const search = `%${req.params.id}%`;
    db.query(q, [req.params.id, search], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
}


export const filterAnime = (req, res) => {
    console.log('filtering')
    const q = `SELECT * FROM Anime WHERE Genres = ? AND Score >= ? AND Score <= ? AND Rating = ? AND Studios = ? AND Source = ?`;
    db.query(q, [req.params.genre, req.params.scoreLow, req.params.scoreHigh, req.params.rating, req.params.studio, req.params.source], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
}