import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { AuthHook } from '../hooks/authHooks'
import logo from '../assets/logo.svg'
import {MenuAlt2Icon, XIcon } from '@heroicons/react/solid'

export default function Navbar() {
    const { logout } = useLogout()
    const {user} = AuthHook()
    const [nav, setNav] = useState(false)
    const handletoggle = () => setNav(!nav);

    const handleLogout = () => {
        logout()
    } 

      // google translator
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
       
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  },[]);

  return (
    <div className='drop-shadow-xl '>
      {/* <div id="google_translate_element"></div> */}
      <div className='pt-8 px-6 flex'>
         <img src={logo}  alt='logo' className=''  />
         <div onClick={handletoggle} className="md:hidden ">
              {!nav ? <MenuAlt2Icon  className='w-5'/> : <XIcon className='w-5'/> }
           </div>
      </div>
        
      {!user && (<div className='hidden'>
          <div><Link to='/signup'>Sign up</Link></div>
          <div><Link to='/login'>login</Link></div>
        </div>)} 

        {user && (
          <div>
         
        <div > 
        <ul className={!nav? 'hidden' : ' absolute bg-black bg-opacity-10 text-center w-full px-8'}>
         <li className='my-8 w-full font-bold'> <Link to='/'>Home</Link></li>
         <li className='my-8 w-full'> <Link to='/uniquelink'>Dashboard</Link></li>
         <li className='my-8 w-full'><Link to='/profile'>Profile</Link></li>
         <li className='my-8 w-full'><Link to='/'>Premium</Link></li>
         <li className='my-8 w-full'><Link to='/create'>Create</Link></li>
          <button className='my-5 p-2 rounded-lg bg-green-50' onClick={handleLogout}>Log out</button>
        </ul>
          
        </div>
        </div>)}
        
    </div>
  )
}
