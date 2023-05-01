
import {db} from "../db.js"


export const getTop10 = (req, res) => {
    // console.log('top10')
    const q = `SELECT * FROM TopTen`
        db.query(q, (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json(data)
    })
}

export const getRecommended = (req, res) => {
        const q = `SELECT a.Name,
        r.rating,
        COUNT(CASE WHEN al.watching_status = 1 THEN 1 ELSE NULL END) AS watching_users,
        COUNT(CASE WHEN al.rating >= 9 THEN 1 ELSE NULL END) AS high_rating_users,
        AVG(al.rating) AS average_rating,
        CASE
          WHEN a.Score >= 8 THEN 'Highly Recommended'
          WHEN a.Score >= 7 THEN 'Recommended'
          ELSE 'Not Recommended'
        END AS recommendation
    FROM Anime a
    JOIN Rating r ON a.MAL_ID = r.MAL_ID
    JOIN OLDAnimelist al ON r.user_id = al.user_id AND al.MAL_ID = a.MAL_ID
    GROUP BY a.MAL_ID
    HAVING COUNT(DISTINCT al.user_id) >= 10 AND MAX(r.rating) >= 7
    ORDER BY a.Score DESC;`
    
    
            db.query(q, (err, data) => {
                if (err) return res.send(err)
                return res.status(200).json(data)
        })
        // console.log('recommend')
        // return res.json(dummyData);
    }


export const getAnime = (req, res) => {
    const q = `SELECT A.MAL_ID AS MAL_ID, A.Name AS Name, A.Japanese_name AS Japanese_name, A.Score AS Score, A.Aired AS Aired, A.Premiered AS Premiered, A.Producers AS Producers, A.Licensors AS Licensors,
    A.Studios AS Studios, A.Source AS Source, A.Duration AS Duration, A.Rating AS Rating, A.Type AS Type, A.Episode AS Episode,
    S.Genres AS Genres, S.Synopsis AS Synopsis
FROM Anime A JOIN AnimeSynopsis S ON A.MAL_ID =S.MAL_ID WHERE A.MAL_ID = ? OR A.Name LIKE ?`;
    const search = `%${req.params.id}%`;
    db.query(q, [req.params.id, search], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
}


export const filterAnime = (req, res) => {
    console.log('filtering');
    let conditions = [];
    let values = [];
    values.push(req.params.scoreLow, req.params.scoreHigh);
    if(req.params.genre !== 'ALL') {
        conditions.push("Genres = ?");
        values.push(req.params.genre);
    }
    if(req.params.rating !== 'ALL') {
        conditions.push("Rating = ?");
        values.push(req.params.rating);
    }
    if(req.params.studio !== 'ALL') {
        conditions.push("Studios = ?");
        values.push(req.params.studio);
    }
    if(req.params.source !== 'ALL') {
        conditions.push("Source = ?");
        values.push(req.params.source);
    }
    const q = `SELECT * FROM Anime WHERE Score >= ? AND Score <= ? ${conditions.length > 0 ? "AND " + conditions.join(" AND ") : ""}`;
    
    console.log(q)
    console.log(values)
    db.query(q, values, (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
}


export const getTopStudios = (req, res) => {
    const q = `WITH temp AS (
        SELECT a.Studios, COUNT(DISTINCT al.user_id) AS num_members,
               COUNT(DISTINCT a.MAL_ID) AS num_shows
        FROM Anime a
        INNER JOIN Rating al ON a.MAL_ID = al.MAL_ID
        GROUP BY a.Studios
      ) SELECT t.Studios, t.num_members, t.num_shows
      FROM temp t
      ORDER BY t.num_members DESC
      LIMIT 10`


        db.query(q, (err, data) => {
            if (err) return res.send(err)
            return res.status(200).json(data)
    })

    // return res.json(dummyData);
}

const dummyData = [
    { Studios: "Madhouse", num_members: 9325, num_shows: 24 },
    { Studios: "Studio Bones", num_members: 8716, num_shows: 15 },
    { Studios: "Kyoto Animation", num_members: 7892, num_shows: 31 },
    { Studios: "Wit Studio", num_members: 6254, num_shows: 19 },
    { Studios: "Toei Animation", num_members: 6243, num_shows: 12 },
    { Studios: "MAPPA Studio", num_members: 5861, num_shows: 29 },
    { Studios: "Studio Ghibli", num_members: 5782, num_shows: 7 },
    { Studios: "Sunrise Studio", num_members: 5159, num_shows: 43 },
    { Studios: "A-1 Pictures", num_members: 4743, num_shows: 27 },
    { Studios: "Ufotable", num_members: 4095, num_shows: 16 },
  ];
  