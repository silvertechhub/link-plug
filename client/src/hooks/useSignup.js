import {useState} from 'react'
import {AuthHook } from './authHooks'
// import axios from 'axios'

export const useSignup = () => {
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = AuthHook()

    const signUp = async (email, password, username, phoneNumber) => {
        setIsLoading(true);
        setErrors(null)

        const response =  await fetch('/api/userRoutes/signup',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify({email, password, username, phoneNumber}),
           
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
                     setErrors(json.error)
                     console.log(json.error)
        }
        if(response.ok){
            setIsLoading(false)

                    // save user to local storage
                localStorage.setItem('user', JSON.stringify(json))
        
                    // add to auth context
                    dispatch({type: 'LOGIN', payload: json}) 
        }                  
        
    }
    return {signUp, errors, isLoading}
}