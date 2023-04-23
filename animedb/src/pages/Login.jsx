import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [err, setErr] = useState(null)

    const { login } = useContext(AuthContext)

    const navigate = useNavigate()
    const inputs = {"email" : email, "password" : password}
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            // const res = await axios.post("/auth/login", inputs)
            await login(inputs)
            // console.log(res)
            navigate('/')
        } catch(err) {
            setErr(err.response.data)
        }
    }
    return (
        <div className='auth'>
            <div className='auth-box'>
                <form className = 'login-form' onSubmit={handleSubmit}>
                    <label htmlFor='email'> Email: </label>
                    <input value = {email} onChange={(e)=>setEmail(e.target.value)} type='email' palceholder='example@email.com' id='email' name='email' />

                    <label htmlFor='password'> Password: </label>
                    <input value = {password} onChange={(e)=>setPassword(e.target.value)} type='password' palceholder='********' id='password' name='password' />
                    <button className='auth-button'>Log In</button>
                    {err && <p style={{color: 'red'}}>{err}</p>}
                </form>
                <button className = 'link-btn'><Link to='/register'>Don't have an account? Register.</Link></button>
            </div>
        </div>
    )
}



