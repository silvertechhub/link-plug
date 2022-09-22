import {AuthHook } from '../hooks/authHooks'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = AuthHook()

    const logout = () => {
    // remove local storage
    localStorage.removeItem('user')

    // logout user
    dispatch({type: 'LOGOUT'})
    navigate('/login')
    }
     
    return {logout}
} 