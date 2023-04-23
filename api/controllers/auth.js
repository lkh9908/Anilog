import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    // check exsisting user
    const q = "SELECT * From Users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.name], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")
        
        // hash password and create user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        
        // username
        // email
        // password
        // user_watching
        // user_completed
        // user_on_hold
        // user_dropped
        // user_plan_to_watch
        // gender
        // location
        // birth_date
        // join_date

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // add 1 because January is 0
        const year = today.getFullYear();
        const dateStr = `${year}-${month}-${day}`;

        const q = "INSERT INTO Users(`username`, `email`, `password`, `user_watching`, `user_completed`, `user_on_hold`, `user_dropped`, `user_plan_to_watch`, `gender`, `location`, `birth_date`, `join_date`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
            0,
            0,
            0,
            0,
            0,
            req.body.gender,
            req.body.location,
            req.body.birth_date,
            dateStr
        ]
        console.log(values)

        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
            return res.status(200).json("User created")
        })
    })
}

export const login = (req, res) => {
    // check exsisting user
    const q = "SELECT * From Users WHERE email = ?"
    db.query(q, [req.body.email], (err,data)=>{
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("User not found!")
        
        // check password 
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        console.log(isPasswordCorrect)
        if(!isPasswordCorrect) return res.status(400).json("Wrong email or password!")
    
        const token = jwt.sign({id:data[0].user_id}, "jwtkey")
        
        const {password, ...other} = data[0]
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")
}