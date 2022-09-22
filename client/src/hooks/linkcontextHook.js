import { LinksContext } from "../context/LinksContex";
import { useContext } from "react";

export const useLinkcontextHook = () => {
    const context = useContext(LinksContext)

    if(!context) {
        throw Error('context hook must be used within the required scope')
    }
    
    return context
}