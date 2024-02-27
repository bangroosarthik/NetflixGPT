import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user= useSelector(store=>store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Si gn-out successful.
    }).catch((error) => {
      // An error happened. 
      navigate("/ErrorPage");
    })
  };
  const handleGPTSearchClick=()=>{
      //Toggle GPT Search
      dispatch(toggleGPTSearchView());
  }

  const handleLangChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) { 
            //when user is signedin
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            // ...
            navigate("/browse");
          } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
          }
        });

        //unsubscibe will be called when component unmounts 
        return ()=> unsubscribe();
  },[])
  return (
    
      <div className="absolute px-6 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
          <img className="w-44" src="netflix.png" alt="logo" />
          {user && <div className="flex py-7">
            { showGptSearch && (<select className="flex p-2 bg-gray-900 m-2 cursor-pointer text-white rounded-md" onChange={handleLangChange}>
                {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>)}
            <button className="font-bold text-white mx-4 m-2 px-2 bg-gray-600  rounded-md hover:bg-opacity-70 " onClick={handleGPTSearchClick}>GPT Search</button>
            <img className="w-12 h-12" src="https://occ-0-3374-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea" alt="signoutbtn" />
            <button className="font-bold text-white ml-2 px-2 rounded-lg hover:bg-red-600 " onClick={handleSignOut}>Sign Out</button>
          </div>
          }
      </div>
      
    
  )
}

export default Header

