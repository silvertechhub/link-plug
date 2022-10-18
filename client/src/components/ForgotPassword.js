import {useState} from 'react'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [serverRes, setServerRes] = useState('')

    const handleSubmit = async () => {
       await axios.post('/api/userRoutes/forgotpassword', {email}).then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setServerRes("Please check your email for the link to reset your password")
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
        })
    }
  return (
    <div>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter the email you used to register'/>
        <button onClick={handleSubmit}>Submit</button>
        {serverRes && <div>{serverRes}</div>}
        <ToastContainer />
    </div>
  )
}
