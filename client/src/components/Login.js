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
      
      console.log("login okay", response.tokenId)
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
        <h2>Or</h2>
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
  )
}
