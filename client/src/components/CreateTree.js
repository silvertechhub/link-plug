import {React, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLinkcontextHook } from '../hooks/linkcontextHook'
import { AuthHook } from '../hooks/authHooks'
import axios from 'axios';
import { Input } from "@material-tailwind/react";
import {PlusIcon} from '@heroicons/react/solid'
import {XCircleIcon} from '@heroicons/react/solid'


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
    <div className='p-6'>
        <div className='mx-10'> 
        <Input type="text" className='w-68' value={displayName} placeholder="enter your username" onChange={e => setDisplayName(e.target.value)}/>
        <p className='text-sm text-center text-gray-400'>This name is what forms your unique link </p>
        </div>
        
        {userLinks.map((list, i) => {
             return(
                <div className='mt-5' key={i}>
                <div className='flex'> 
                <Input variant="standard" label="Label" required className='w-52' type="text" name='label' value={list.label} onChange={e => handleChange(e, i)}  />
                {userLinks.length !== 1  && <button className='text-red-500 pr-8 pt-6 ' onClick={handleRemoveInput}><XCircleIcon className='w-6'/></button>}
                </div>
                <div className='mb-7'>
                    <Input variant="standard" type="url" required className='w-72' name='urls' label='URL' value={list.urls} onChange={e => handleChange(e, i)}/>
                </div>
               
            </div>
             )
        }
        ) }
       
       
        <div className='flex text-sm text-green-500'>
        <PlusIcon className='w-5' />
        <button className='my-2 ' onClick={handleAddInput}>
            Add input field
        </button>
        </div>
       
        <button className='p-3 bg-sec bg-opacity-75 text-white' onClick={GenerateLink}>Generate Link</button>
       
        {error && <span>{error}</span>}
    </div>
  )
}
