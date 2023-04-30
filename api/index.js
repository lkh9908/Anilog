import express from "express";
import AnimeRoute from "./routes/anime.js"
import AuthRoute from "./routes/auth.js"
import UsersRoute from "./routes/users.js"
import watchListRoute from "./routes/watchList.js"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/anime", AnimeRoute)
app.use("/api/watchList", watchListRoute)
app.use("/api/users", UsersRoute)
app.use("/api/auth", AuthRoute)

// app.get("/test", (req, res) => {
//     res.json("working")
// })

app.listen(8800, () => {
    console.log("connected")
})