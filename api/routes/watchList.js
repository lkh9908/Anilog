import express from "express"
import { addList, deleteList, getList, updateList } from "../controllers/watchList.js"
const router = express.Router()

router.get("/", getList)
// router.get("/:id", testAnime)
router.post("/:id/:rating/:watchingStatus/:watchedEpisodes", addList)
router.delete("/:id", deleteList)
router.put("/:id", updateList)

export default router