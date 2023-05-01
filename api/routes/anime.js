import express from "express"
import { getTop10, getAnime, filterAnime, getTopStudios, getRecommended } from "../controllers/anime.js"
const router = express.Router()
router.get("/recommended", getRecommended)
router.get("/top10", getTop10)
router.get("/topStudios", getTopStudios)

router.get("/:id", getAnime)
router.get("/:genre/:scoreLow/:scoreHigh/:rating/:studio/:source", filterAnime)



export default router