import { AuthContext } from '../context/authcontext'
import { useContext } from 'react'

export const AuthHook = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('auth hook must be used inside auth context')
    }

    return context
}