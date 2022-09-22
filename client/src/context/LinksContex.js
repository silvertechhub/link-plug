import { React, createContext, useReducer } from "react";


export const LinksContext = createContext();


export const LinksReducers = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_LINKS':
            return{
                userPlug: action.payload
            }
        case 'ADD_LINKS':
            return {
                userPlug: [action.payload, ...state.userPlug ]
            }
        case 'DELETE_LINKS' : 
            return {
                userPlug: state.userPlug.filter((u) => u._id !== action.payload._id )
            }
        default:
            return state     
    }
}

export default function LinksContexProvider(props) {
    const [state, dispatch] = useReducer(LinksReducers, {userPlug: null})
    
  return (
    <LinksContext.Provider value={{...state, dispatch}}>
        {props.children}
    </LinksContext.Provider>
  )
}
