import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { AuthHook } from '../hooks/authHooks'

export default function Navbar() {
    const { logout } = useLogout()
    const {user} = AuthHook()

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
    <div className='bg-gray-400'>
      <div id="google_translate_element"></div>
        <h1>PLUG LINKZ</h1>
      {!user && (<div align="right">
          <div><Link to='/signup'>Sign up</Link></div>
          <div><Link to='/login'>login</Link></div>
        </div>)} 

        {user && (
        <div>
          <span>Hi there, {user.username}!</span>
          <Link to='/'>Home</Link>
          <Link to='/create'>Create</Link>
          <Link to='/profile'>Profile</Link>
          <button onClick={handleLogout}>Log out</button>
        </div>)}
        
    </div>
  )
}
