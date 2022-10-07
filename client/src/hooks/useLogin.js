import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {AuthHook } from './authHooks'


export const useLogin = () => {
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate() 
    const { dispatch } = AuthHook()
 
    const login = async (email, password) => {
        setIsLoading(true);
        setErrors(null)

        const response =  await fetch('/api/userRoutes/login',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify({email, password}),
           
        }) 
        const json = await response.json()
     
        if(!response.ok){
            setIsLoading(false)
                     setErrors(json.error)
                     console.log(json.error)
        }
        if(response.ok){
            setIsLoading(false)
                console.log(json)
                    // save user to local storage
                localStorage.setItem('user', JSON.stringify(json))
        
                    // add to auth context
                    dispatch({type: 'LOGIN', payload: json}) 
                    navigate(`/uniquelink`) 
        }                  
        
    }

   
    return {login,  errors, isLoading}
}