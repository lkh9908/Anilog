import React, {useState} from 'react'

export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }
    return (
        <div className='auth-form-container'>
            <form className = 'login-form' onSubmit={handleSubmit}>
                <label htmlFor='email'> Email: </label>
                <input value = {email} onChange={(e)=>setEmail(e.target.value)} type='email' palceholder='example@email.com' id='email' name='email' />

                <label htmlFor='password'> Password: </label>
                <input value = {password} onChange={(e)=>setPassword(e.target.value)} type='password' palceholder='********' id='password' name='password' />
                <button>Log In</button>
            </form>
            <button className = 'link-btn' onClick={()=>props.onFormSwitch('register')}>Don't have an account? Register.</button>
        </div>
    )
}