import React, {useState} from 'react'
import { Link } from 'react-router-dom'


export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
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
                </form>
                <button className = 'link-btn'><Link to='/register'>Don't have an account? Register.</Link></button>
            </div>
        </div>
    )
}



