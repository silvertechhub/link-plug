import {useNavigate} from 'react-router-dom';
import { AuthHook } from '../hooks/authHooks'


export default function Home() {
    const navigate = useNavigate();
    const {user} = AuthHook()
      
    const handleButton = () => {
      if(user){
        navigate('/uniquelink')
      }else{
        navigate('/login');
      }
       
      
    }
   
    

  return (
    <div className=' p-10 '>
      <div className='my-56'>
        <h1 className=' text-5xl text-theme text-center '>Share all your profile with one link</h1>
        <div className='my-10 mx-14'>
          {/* <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)}/> */}
          <button onClick={handleButton}>Get Started</button>
        </div>
        <div>
          <h1>CONTENT</h1>
        </div>
        <div>
          <h1>MORE CONTENT</h1>
        </div>
        <div>
          <h1>EVEN MORE CONTENT</h1>
        </div>
        </div>
    </div>
  )
}
