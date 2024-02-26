import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user= useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Si gn-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/ErrorPage");

    })
  };
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
            <img className="w-12 h-12" src="https://occ-0-3374-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea" alt="signoutbtn" />
            <button className="font-bold text-white ml-2 px-2 border-2 rounded-lg" onClick={handleSignOut}>Sign Out</button>
          </div>
          }
      </div>
      
    
  )
}

export default Header

