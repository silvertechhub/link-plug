import {Link, useNavigate} from 'react-router-dom';
import { AuthHook } from '../hooks/authHooks'
import Lottie from "react-lottie"
import animation from '../loader.json'
import trackLottie from '../track.json'
import tiktokLottie from '../tiktok.json'


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
   
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };
    const track = {
      loop: true,
      autoplay: true,
      animationData: trackLottie,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };
    const tiktok = {
      loop: true,
      autoplay: true,
      animationData: tiktokLottie,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };
 
  return (
    <div className='px-5'>
      <div className='mt-10'>
        <h1 className=' text-5xl text-sec text-center font-bold py-7'>Let the world find you with one link</h1>
        <p className='text-center text-xl font-semibold py-7'>Plug all your profile links and share your unique link </p>
        <div className='flex justify-center'>
          {/* <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)}/> */}
          <button className='bg-sec w-40 h-10 text-white rounded-2xl' onClick={handleButton}>Get Started</button>
        </div>
        <div className='my-5'>
          <h1 className='text-3xl font-bold text-center py-4 text-pry'>Link all your Profiles</h1>
        <Lottie options={defaultOptions} height={300} width={300} />
          <p className='text-lg text-center px-4 py-5 text-sec'>
            Put all your profile (social media, music, blog-articles) togther and share with one single link
            <br /><Link to='/signup' className='text-pry text-lg'>Start Now>> </Link>
            </p>
            
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center text-pry'>Check who's looking</h1>
          <Lottie options={track} height={300} width={300} />
          <p className='text-lg text-center px-4 py-5 text-sec'>
           Get anayltics and data of the number of people that are clicking on your link
            <br /><Link to='/signup' className='text-pry text-lg'>Learn more>> </Link>
            </p>
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center text-pry'>Link Your TikTok</h1>
          <Lottie options={tiktok} height={300} width={300} />
          <p className='text-lg text-center px-4 py-5 text-sec'>
           Add your tiktok profile to your Link plug directly from the Tiktok app. 
            <br /><Link to='/signup' className='text-pry text-lg'>Sign up>> </Link>
            </p>
        </div>
        </div>
    </div>
  )
}
