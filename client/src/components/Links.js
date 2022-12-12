import { AuthHook } from '../hooks/authHooks'
import {Link} from 'react-router-dom';
import { useLinkcontextHook } from '../hooks/linkcontextHook'
import axios from 'axios'
import Lottie from "react-lottie"
import animation from '../loader.json'
import { v4 as uuidv4 } from 'uuid'
import { CopyToClipboard } from "react-copy-to-clipboard";
import {ClipboardCopyIcon } from '@heroicons/react/solid'

export default function Links({ handleButton}) {

  const { user } = AuthHook();
  const { userPlug, dispatch } = useLinkcontextHook();
  const handleDelete = async () => {
    if(window.confirm(`Are you sure you wanna delete this?`)){
      await axios.delete(`/api/routes/${userPlug[0]._id}`, {headers: 
        { 'Authorization': `Bearer ${user.token}`} 
        }).then((res) => {
          dispatch({type: 'DELETE_LINKS', payload:res.data})
         
        }).catch((err) => {console.log(err.message)})
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
  
 
  return (
    <div>
       {userPlug && userPlug.length === 0  ? 
       <div className='my-6 px-6'>
        <h3 className='text-xl font-semibold py-5 text-center'>Plug all your profiles and share with one link</h3>
       <div className='flex justify-center'>
         <button className='bg-sec bg-opacity-50 p-3 rounded-md text-white' onClick={handleButton}>click here to start</button>
       </div>

       <div className='my-5'>
          <h1 className='text-3xl font-bold text-center py-4 text-pry'>Link all your Profiles</h1>
        <Lottie options={defaultOptions} height={300} width={300} />
          <p className='text-lg text-center px-4 py-5 text-sec'>
            Put all your profile (social media, music, blog-articles) togther and share with one single link
            <br /><Link to='/create' className='text-pry text-lg'>Start Now>> </Link>
            </p>
            
        </div>
         </div> : 
         <div>
            {userPlug && userPlug.map((details) => (
                <div key={uuidv4()} className=' mx-6 py-3'>
               
                <h1 className='text-center'>@{details.displayName}</h1>
                {details && details.userLinks.map((pair) => (
                  <div key={uuidv4()} className='grid place-items-center'>
                    <div className='w-auto px-3 py-1 bg-gray-600 text-white rounded-tl-lg rounded-br-lg text-center my-5'>{pair.urls}</div>
                    <div className='absolute left-1/2 -ml-0.5 w-px h-8 bg-black'></div>
                    <div className='border rounded-tr-lg rounded-bl-lg bg-gray-500 bg-opacity-50 w-1/3 py-1 my-5 text-center'>{pair.label}</div>
                   
                  </div>
                ))}
                <div className='flex justify-center'>
                  <button className='bg-black bg-opacity-75 w-36 h-10 text-white rounded-2xl' onClick={handleDelete}>delete</button>
                </div>
                 <div className='mt-6'>
                 <h5 className='text-center'>Share you Link below</h5>
                
                 <CopyToClipboard
                  text={`https://link-plug.herokuapp.com/${details.displayName}`}
                  onCopy={() => alert("Copied")}>
                    <p className='text-lg text-center'>
                      https://link-plug.herokuapp.com/{details.displayName}
                    </p>
                 </CopyToClipboard>
                <div className='flex justify-center pt-3'> <p className='text-sm text-gray-400'>Click on the link to copy </p> <ClipboardCopyIcon className='w-5'/></div>
                 </div>
               
                  </div>
              ))}
          </div>}
          
    </div> 
  )
}
