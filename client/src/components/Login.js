import  { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import {AuthHook } from '../hooks/authHooks'

export default function Login() {
    const { login,  errors, isLoading } = useLogin()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { dispatch } = AuthHook()
    const navigate = useNavigate() 
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        login(email, password)
    }

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
   });
    

    const handleGoogleLogin = async (response) => {
        await axios.post('/api/userRoutes/googleLogin',
        {token: response.tokenId}).then((res) => {
          console.log(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          dispatch({type:'LOGIN', payload: res.data})
          navigate(`/uniquelink`) 
      }).catch(err => { 
        console.log(err)
      })  
      
  }

  const failedLogin = () => {
    alert("fail")
  }

  
  return (
    <div className='px-6 lg:flex justify-center'>
      <div className='mt-20 p-10 md:px-52 lg:max-w-md lg:px-20 container rounded-lg border border-gray-200 shadow-md '>
      <h2 className='text-center text-3xl text-sec font-bold underline underline-offset-4'> Login </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label><br/>
            <input type="text" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div><br/>
          <div>
            <label>Password: </label><br/>
            <input type="password" className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={password} minLength= '6' onChange={(e) => setPassword(e.target.value)} />
          </div><br/>
          <div className='flex justify-center'>
            <input type='submit' value="submit" className='bg-pry w-40 h-10 text-white rounded-2xl' disabled={isLoading} onSubmit={handleSubmit} /><br/>
          </div>
          <div className='px-14 py-5'>
            <Link to='/forgotpassword' className='text-sec'>Forgot password?</Link><br/>
            {errors && <span className='text-sm text-red-600'>{errors}</span>}
            <span className='text-xs'>First Time? <Link to='/signup' className='text-pry underline underline-offset-4'>Sign up</Link></span>
          </div>
        </form>
       
        <h2 className='text-2xl font-semibold text-sec text-center py-4'>Or</h2>
            <div>
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with your google account"
              onSuccess={handleGoogleLogin}
              onFailure={failedLogin}
              cookiePolicy={'single_host_origin'}
            />
          </div>
      </div>
       
    </div>
  )
}
