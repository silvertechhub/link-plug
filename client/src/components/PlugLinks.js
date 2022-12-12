import {useEffect, useState} from 'react'
import { AuthHook } from '../hooks/authHooks'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default function PlugLinks() {
  const {displayNames} = useParams()
  const { user } = AuthHook()
  const [pluglink, setpluglink] = useState('')
  

  useEffect(() => {
    const getlinks = async () => {
      
        axios.get(`/api/routes/${displayNames}`).then((res) => {
          setpluglink(res.data)
        }).catch((err) => {
          console.log(err) 
        })
           
      
    } 
    
      getlinks()
    
   
  }, [] )
  return (
    <div className='bg-gray-500 bg-opacity-80 h-screen px-6'>
      
        <h4 className='my-5 pt-5 text-center text-white font-bold text-lg'>@{pluglink && pluglink.displayName}</h4>
        {pluglink && pluglink.userLinks.map((userlink) => (
          <div className='grid place-items-center' key={uuidv4()}>
           <li className='my-7 list-none'> <a className='bg-black bg-opacity-75 text-white p-2 px-8 rounded' href={userlink.urls}>
              {userlink.label}
              </a></li> 
            
          </div>
        ))}
        <div>

        </div>
    <p className='text-center text-white'> create your link plug <Link className='text-sec' to='/'>Here</Link></p>
    </div>
  )
}
