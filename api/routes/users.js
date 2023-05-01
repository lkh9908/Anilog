import express from "express"
import { getUser, topUsers } from "../controllers/users.js"
const router = express.Router()


router.get("/", getUser)

router.get("/topUsers", topUsers)
export default router