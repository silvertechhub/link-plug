import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
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
    <div className='px-6'>
      <div  className='mt-20 p-10 md:px-52 lg:max-w-md lg:px-20 container rounded-lg border border-gray-200 shadow-md '>
      <h2 className='text-center text-3xl text-sec font-bold underline underline-offset-4'> Sign up </h2>
        <form onSubmit={handleSubmit}>
            <label>UserName</label>
            <input type="text" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={username} onChange={(e) => setUsername(e.target.value)} /><br/>

            <label>Email</label>
            <input type="text" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={email} onChange={(e) => setEmail(e.target.value)} /><br/>

            <label>Password</label>
            <input type="password" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={password} minLength= '6' onChange={(e) => setPassword(e.target.value)} /> <br/>
            
            <label>Phone Number</label>
            <input type="number" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={phoneNumber} minLength= '11' onChange={(e) => setPhoneNumber(e.target.value)} /><br/>

            <div className='py-4 flex justify-center'>
            <input type='submit' className='bg-pry w-40 h-10 text-white rounded-2xl' value="submit" disabled={isLoading} onSubmit={handleSubmit} />
            </div>
        </form>
        {errors && <p className='text-sm text-red-600'>{errors}</p>}
        <div>
          <p>By creating an account you are agreeing to our 
            <Link to='#' className='text-pry underline underline-offset-2'> Terms and Conditions</Link> and confirm you have read our Privacy Notice. </p>
        </div><br/>
        <span>Already have an account? <Link to='/login' className='text-pry'>Login</Link></span>
        
            <div>
            <h2 className='text-2xl font-semibold text-sec text-center py-4'>Or</h2>
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            />
          </div>
      </div>
        
    </div>
  )
}
