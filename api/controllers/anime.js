
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