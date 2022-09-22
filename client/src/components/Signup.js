import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useSignup} from '../hooks/useSignup'

export default function Signup() {

    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const {signUp, errors, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUp(email, password, username, phoneNumber)
         
    }

  return (
    <div>
        <h2> Sign up </h2>
        <form onSubmit={handleSubmit}>
            <label>UserName</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>

            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>

            <label>Password</label>
            <input type="password" value={password} minLength= '6' onChange={(e) => setPassword(e.target.value)} /> <br/>
            
            <label>Phone Number</label>
            <input type="number" value={phoneNumber} minLength= '11' onChange={(e) => setPhoneNumber(e.target.value)} /><br/>


            <input type='submit' value="submit" disabled={isLoading} onSubmit={handleSubmit} />
        </form>
        {errors && <p>{errors}</p>}
        <div>
          <p>By creating an account you are agreeing to our <a href='#'>Terms and Conditions</a> and confirm you have read our Privacy Notice.


</p>
        </div>
        <span>Already have an account? <Link to='/login'>Login here</Link></span>
    </div>
  )
}
