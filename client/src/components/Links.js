import { AuthHook } from '../hooks/authHooks'
import { useLinkcontextHook } from '../hooks/linkcontextHook'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Links({ handleButton}) {

  const { user } = AuthHook();
  const { userPlug, dispatch } = useLinkcontextHook();

  const handleDelete = async () => {
    if(window.confirm(`Are you sure you wanna delete this?`)){
      await axios.delete(`/api/routes/${userPlug[0]._id}`, {headers: 
        { 'Authorization': `Bearer ${user.token}`} 
        }).then((res) => {
          dispatch({type: 'DELETE_LINKS', payload:res.data})
         
        }).catch((err) => {console.log(err.message)})
    }
   
  } 

  
 
  return (
    <div>
       {userPlug && userPlug.length === 0  ? 
       <div>
        <h3>Plug all your profiles and share with one link</h3>
        <button onClick={handleButton}>click here to start</button>
         </div> : 
         <div>
            {userPlug && userPlug.map((details) => (
                <div key={uuidv4()}>
               
                <h1>{details.displayName}</h1>
                {details && details.userLinks.map((pair) => (
                  <div key={uuidv4()}>
                      
                    <h5>{pair.label}</h5>
                    <h5>{pair.urls}</h5>
                  </div>
                ))}
                <button onClick={handleDelete}>delete</button>
                 <h5>Share you Link below</h5>
                 <p>http://localhost:3000/{details.displayName}</p>
                 <CopyToClipboard
                  text={`http://localhost:3000/${details.displayName}`}
                  onCopy={() => alert("Copied")}>
                    <button>Copy to clipboard </button>
                 </CopyToClipboard>
                 
                 {/* <button onClick={handleCopyClick}>{isCopied ? 'Copied' : 'Copy link'}</button> */}
                  </div>
              ))}
          </div>}
          
    </div> 
  )
}
