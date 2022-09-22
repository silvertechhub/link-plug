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
    <div>
      
        <h4>{pluglink && pluglink.displayName}</h4>
        {pluglink && pluglink.userLinks.map((userlink) => (
          <div key={uuidv4()}>
            <h3>{userlink.label}</h3>
            <h5>{userlink.urls}</h5>
          </div>
        ))}
    <p> create your own link plug <Link to='/'>Here</Link></p>
    </div>
  )
}
