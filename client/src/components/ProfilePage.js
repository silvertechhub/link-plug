import axios from 'axios';
import { AuthHook } from '../hooks/authHooks'
import Links from './Links';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function ProfilePage() {
    const [editUsername, setEditUsername] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPhoneNumber, setEditPhoneNumber] = useState('')
    const { user, dispatch } = AuthHook();
    const navigate = useNavigate()
    

    const deleteUser = async () => {
        const id = user.id
        if(window.confirm(`Are you sure you want to delete your account with us? 
        You won't be able to undo this action`)){
            axios.delete(`/api/userRoutes/${id}`, {headers: 
                { 'Authorization': `Bearer ${user.token}`} 
                }).then((res) => {
                console.log(res)
                
                    localStorage.removeItem('user')
                    dispatch({type: 'LOGOUT'})
                    navigate('/signup')
            }).catch((err) => {
                console.log(err)
            })
        }
       
    }

    const editProfile = async () => {
        const id = user.id
        axios.patch(`api/userRoutes/${id}`, {username: editUsername, email: editEmail, phoneNumber: editPhoneNumber}, {headers: 
            { 'Authorization': `Bearer ${user.token}`} 
            }).then((res) => {
                dispatch({type: 'EDIT', payload: res.data})
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }
  return (
    <div>
        <div>
            <h4>{user.username}</h4>
            {/* <input type='text' value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/> */}
        </div>
        <div>
            <h6>{user.email}</h6>
            {/* <input type='text' value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/> */}
        </div>
        <div>
            <h6>{user.phoneNumber}</h6>
            {/* <input type='text' value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)}/> */}
        </div>
        <Links />
       <div> <button onClick={deleteUser}>Delete your account</button></div>
        <button onClick={editProfile} disabled={true}>Edit your profile</button>
    </div>
  )
}
