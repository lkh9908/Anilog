import mysql from "mysql"
// import configData from './config.json' assert { type: "json" };

const configData = {
    "host": "animedb.clz8da8xt4gt.us-east-1.rds.amazonaws.com",
    "port": 3306,
    "user": "anime_admin",
    "password": "AnimeProject550!",
    "db": "ANIME",
    "server_host":"localhost",
    "server_port":"8800"
  }
export const db = mysql.createConnection({
    host: configData.host,
    user: configData.user,
    password: configData.password,
    port: configData.port,
    database: configData.db
})