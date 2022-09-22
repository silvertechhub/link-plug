import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export default function Login() {
    const { login, errors, isLoading } = useLogin()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        login(email, password)
    }

  return (
    <div>
        <h2> Login </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} minLength= '6' onChange={(e) => setPassword(e.target.value)} />
          </div>
            <input type='submit' value="submit" disabled={isLoading} onSubmit={handleSubmit} />
            {errors && <span>{errors}</span>}
        </form>
        <span>First Time? <Link to='/signup'>Sign up here</Link></span>
    </div>
  )
}
