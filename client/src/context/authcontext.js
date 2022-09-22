import { createContext, useEffect, useReducer} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action ) =>{
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'EDIT':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default: 
            return state       
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type: 'LOGIN', payload:user})
            dispatch({type: 'EDIT', payload:user})
        }
    }, [])
    
    console.log("auth state is :", state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}