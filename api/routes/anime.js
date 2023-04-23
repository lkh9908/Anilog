import express from "express"
import { testAnime } from "../controllers/anime.js"
const router = express.Router()

router.get("/test", testAnime)

export default router