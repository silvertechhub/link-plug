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
    <div className='px-6'>
       <div className='mt-20 p-10 md:px-52 lg:max-w-md lg:px-20 container rounded-lg border border-gray-200 shadow-md '>
       <h2 className='text-center text-3xl text-sec font-bold underline underline-offset-4'> Forgot Password </h2><br/>
        <input type='text' className='my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your registered email'/>
          <div className='flex justify-center py-3'>
            <button className='bg-pry w-40 h-10 text-white rounded-2xl' onClick={handleSubmit}>Submit</button>
          </div>
          {serverRes && <div>{serverRes}</div>}
          <ToastContainer />
       </div>
        
    </div>
  )
}
