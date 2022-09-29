import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { AuthHook } from '../hooks/authHooks'

export default function Navbar() {
    const { logout } = useLogout()
    const {user} = AuthHook()

    const handleLogout = () => {
        logout()
    } 
  return (
    <div className='bg-gray-400'>
        <h1>PLUG LINKZ</h1>
      {!user && (<div align="right">
          <div><Link to='/signup'>Sign up</Link></div>
          <div><Link to='/login'>login</Link></div>
        </div>)} 

        {user && (
        <div>
          <span>Hi there, {user.username}!</span>
          <Link to='/'>Home</Link>
          <Link to='/create'>Create</Link>
          <Link to='/profile'>Profile</Link>
          <button onClick={handleLogout}>Log out</button>
        </div>)}
        
    </div>
  )
}
