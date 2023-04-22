import React, {useState} from 'react'

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    const [birthdate, setBirthdate] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }
    return (
        <div className='App auth-form-container'>
            <form className = 'register-form' onSubmit={handleSubmit}>
                <label htmlFor='email'> Email: </label>
                <input value = {email} onChange={(e)=>setEmail(e.target.value)} type='email' palceholder='example@email.com' id='email' name='email' />

                <label htmlFor='userName'> User Name: </label>
                <input value = {userName} onChange={(e)=>setUserName(e.target.value)} type='userName' palceholder='xxxxx' id='userName' name='userName' />

                <label htmlFor='password'> Password: </label>
                <input value = {password} onChange={(e)=>setPassword(e.target.value)} type='password' palceholder='********' id='password' name='password' />

                <label htmlFor='gender'> Gender: </label>
                <input value = {gender} onChange={(e)=>setGender(e.target.value)} type='gender' palceholder='********' id='gender' name='gender' />

                <label htmlFor='location'> Location: </label>
                <input value = {location} onChange={(e)=>setLocation(e.target.value)} type='location' palceholder='********' id='location' name='location' />

                <label htmlFor='birthdate'> Birthdate: </label>
                <input value = {birthdate} onChange={(e)=>setBirthdate(e.target.value)} type='birthdate' palceholder='********' id='birthdate' name='birthdate' />
                <button>Register</button>
            </form>
            <button className = 'link-btn' onClick={()=>props.onFormSwitch('login')}>Already have an account? Login.</button>
        </div>
    )
}
