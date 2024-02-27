import Header from "./Header"
import { useRef, useState } from "react"
import { checkvalidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const email=useRef(null);
  const password=useRef(null);
  const name=useRef(null);
  
  const handleButtonClick=()=>{
    //Validate the form data
    console.log(email.current?.value,password.current?.value);
    const message=checkvalidData(email?.current.value,password.current?.value);
    setErrorMessage(message);
    if(message) return;

    //signin signup logic
    if(!isSignInForm){
      //SignUp logic
      createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "Sarthik.png"
        }).then(() => {
          // Profile updated!
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          // ...
        }).catch((error) => {
          // An error occurred
          setErrorMessage(errorMessage)
        });
        
        
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+" "+errorMessage);
      });
    }

    else{

      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse");
        // console.log("Success "+user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage("User Not Found!");
      });

    }
  
  }


  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }
  return (
    <div>
    <Header />
    <div className="absolute">
        <img src={BG_URL} className="bg-cover" alt="logo" />
    </div>
    <form onSubmit={(e)=> e.preventDefault()} action="" className="absolute p-12 bg-black bg-opacity-65 rounded-md w-3/12 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-4xl py-4">{isSignInForm ? "Sign In":"Sign Up"}</h1>
        {!isSignInForm && ( <input ref={name}  type="text" placeholder="Full Name" className=" text-gray-400 p-4 my-2 w-full bg-transparent border-gray-700 border-2 rounded  "/>)}
        <input ref={email} type="email" placeholder="Email " className=" text-gray-400 p-4 my-4 w-full bg-transparent border-gray-700 border-2 rounded  "/>
       
        <input ref={password} type="password" placeholder="Password" className=" text-gray-400 p-4 my-2 w-full  bg-transparent border-gray-700 border-2 rounded "/>
        
        <p className="text-xs pb-2 font-semibold text-red-600">{errorMessage}</p>
        <button onClick={handleButtonClick} className="p-3 my-1 bg-red-600 w-full rounded font-bold">{isSignInForm ? "Sign In":"Sign Up"}</button>
        <p className="text-gray-400 py-4" >{isSignInForm ? "New to Netflix?":"Already Registered?"} <span className="text-white font-bold cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign up now":"Sign In now"}</span></p>
        
    </form>
    </div>
  )
}

export default Login