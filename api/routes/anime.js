import express from "express"
import { getTop10, getAnime } from "../controllers/anime.js"
const router = express.Router()

router.get("/top10", getTop10)
router.get("/:id", getAnime)

export default router