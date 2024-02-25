import Header from "./Header"
import { useState } from "react"
const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);

  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }
  return (
    <div>
    <Header />
    <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="logo" />
    </div>
    <form action="" className="absolute p-12 bg-black bg-opacity-65 rounded-md w-3/12 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-4xl py-4">{isSignInForm ? "Sign In":"Sign Up"}</h1>
        {!isSignInForm && ( <input type="text" placeholder="Full Name" className=" text-gray-400 p-4 my-4 w-full bg-transparent border-gray-700 border-2 rounded  "/>)}
        <input type="email" placeholder="Email or phone number" className=" text-gray-400 p-4 my-4 w-full bg-transparent border-gray-700 border-2 rounded  "/>
        <input type="password" placeholder="Password" className=" text-gray-400 p-4 my-4 w-full  bg-transparent border-gray-700 border-2 rounded "/>
        <button className="p-3 my-1 bg-red-600 w-full rounded font-bold">{isSignInForm ? "Sign In":"Sign Up"}</button>
        <p className="text-gray-400 py-4" >{isSignInForm ? "New to Netflix?":"Already Registered?"} <span className="text-white font-bold cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign up now":"Sign In now"}</span></p>
    </form>s
    </div>
  )
}

export default Login