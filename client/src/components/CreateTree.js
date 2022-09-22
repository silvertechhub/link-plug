import {React, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLinkcontextHook } from '../hooks/linkcontextHook'
import { AuthHook } from '../hooks/authHooks'
import axios from 'axios';


export default function CreateTree() {
    const {dispatch} = useLinkcontextHook();
    const navigate = useNavigate();
    const { user } = AuthHook()

    const [userLinks, setUserLinks] = useState([
            { label: "", urls:""}
        ]);
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(null)

    
    

    // handle change function
    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const list =[...userLinks];
        list[index][name] = value
        setUserLinks(list);
       
    }
    // generate link function
    const GenerateLink = async (e) => {
        e.preventDefault(); 
        if(!user){
            setError('you have to be logged in')
            return
        }
        
         axios.post('/api/routes/links', 
            {displayName, userLinks},
            {headers: 
                { 'Authorization': `Bearer ${user.token}`} 
                }).then(
            (res) => {                
                console.log(userLinks)
                if(res.status === 200){
                    dispatch({type: 'ADD_LINKS', payload: res.data});
                    navigate(`/uniquelink`)  
                 }
            }
        ).catch((err) => {console.log(err)})
           
         
         
    }

    // add input function
    const handleAddInput =() =>{
        setUserLinks([...userLinks,  {   label: "", urls:""}])
    }
    // remove input function
    const handleRemoveInput = (index) => {
        const list =[...userLinks]
        list.splice(index, 1 );
        setUserLinks(list)
    }

  return (
    <div>
        <input type="text" value={displayName} placeholder="enter your username" onChange={e => setDisplayName(e.target.value)}/>
        
        {userLinks.map((list, i) => {
             return(
                <div key={i}>
                <div>
                    <label>name</label>
                    <input type="text" name='label' value={list.label} onChange={e => handleChange(e, i)} />
                </div>
                <div>
                    <label>Url</label>
                    <input type="url" name='urls' value={list.urls} onChange={e => handleChange(e, i)}/>
                </div>
            </div>
             )
        }
        ) }
       
       
        <button onClick={handleAddInput}>
            add input field
        </button>
        {userLinks.length !== 1  && <button onClick={handleRemoveInput}>remove</button>}
        <button onClick={GenerateLink}>Generate Link</button>
        <div>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
        {error && <span>{error}</span>}
    </div>
  )
}
