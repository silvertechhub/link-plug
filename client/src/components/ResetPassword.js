import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const [validUrl, setValidUrl] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirm] = useState('')
    const [error, setError] = useState('')
    const {token, id} = useParams()

    const url = `http://localhost:3000/resetpassword/${token}/${id}`


    // useEffect(() => {
    //     const verifyUrl = async () =>{
    //         try{
    //             await axios.get(url);
    //             setValidUrl(true)
    //         }catch(error){
                
    //         }
            
    //     }
    //     verifyUrl()
    // }, [param, url])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if(password === confirmPassword){
        //     console.log("submitted")
        //    }else{
        //         setError("Make sure that your put in the correct password in both input fields")
        // }
        await axios.post('/api/userRoutes/resetpassword', {
            newPass:password, resetPassToken:token, userId:id}).then((res) => {
                console.log(res)
                toast.success(res.data)
            }).catch((err) => {
                console.log(err.response.data.error)
            })
        
    }
  return (
    <div>
        {validUrl ? <div>
            <form onSubmit={handleSubmit}>
            <div>
            <label>Enter new password</label>
            <input type='password' required value={password} minLength='6' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
            <label>Confirm new password</label>
            <input type='password' required value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <input type='submit' onSubmit={handleSubmit} />
        </form>
        {error && <p>{error}</p>}
        </div> : 
            <div>
                <h1>404 Error</h1>
                <h2>Page not found</h2>
            </div>
        }
       
    </div>
  )
}
