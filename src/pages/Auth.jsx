import React, { useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { vaildateAuth } from "../utils/validateAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [error , setError] = useState("");

  const emailRef = useRef();
  const passRef  = useRef();
  const cPassRef = useRef();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = (e) =>{
    e.preventDefault();
    const err = vaildateAuth(emailRef.current.value , passRef.current.value , cPassRef.current?.value , isLogin)
    setError( err )
    console.log(err);
    
    if(err!==""){
      // console.log(err , error);
      toast.error( err )
      return
    }
    // console.log("Do login here");

      navigate("/home");
      toast.success(`${isLogin ? "Login" : "Signup"} Suuccessfully`)
      dispatch( addUser( { email : emailRef.current.value } ) )
    

  }

  return (
    <form onSubmit={(e)=> submitHandler(e)} className=" relative flex flex-col justify-start items-center py-12 min-h-[100vh] md:max-h-[50vh] md:max-w-[50%] mx-auto w-[90%] px-6 gap-8" >
      <div className=" text-3xl text-gray-800"> {isLogin ? "Login" : "Register"} </div>
      <div className=" text-gray-600 w-[60%] mx-auto">
        {" "}
        By signing in you are agreeing our{" "}
        <span className=" text-blue-500">Term and privacy policy</span>{" "}
      </div>

      <div className=" flex w-[50%] mx-auto justify-between px-5 items-center">
        <div onClick={()=> setIsLogin(true)} className={` text-gray-600 ${isLogin ? " text-blue-600 border-b-2 border-black" : ""} `}>Login</div>
        <div onClick={()=> setIsLogin(false)} className={` text-gray-600 ${!isLogin ? " text-blue-600 border-b-2 border-black" : ""} `}> Register </div>
      </div>

      <div className=" border-b border-b-gray-800 w-[80%] min-h-10 mx-auto flex justify-evenly items-center " >
        <CiMail className=" w-[10%] h-[90%] md:w-[5%]  text-gray-600 my-auto"></CiMail>
        <input ref={emailRef} className=" w-[85%] focus-within:outline-none" type="email" placeholder="Email Address" required>
        </input>
      </div>

      <div className= " border-b border-b-gray-800 relative w-[80%] min-h-10 mx-auto flex justify-evenly items-center ">
        <IoLockClosedOutline className=" w-[10%] md:w-[5%] h-[80%]  text-gray-600 my-auto"></IoLockClosedOutline>
        <input ref={passRef} className=" w-[85%] focus-within:outline-none" type={showPassword ? "text" : "password"} placeholder="Password" required>
        </input>

        <div onClick={()=>setShowPassword(!showPassword)} className=" absolute right-0 text-xl">
          {" "}
          {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}{" "}
        </div>
      </div>

      {
        !isLogin && (<div className= " border-b border-b-gray-800 relative w-[80%] min-h-10 mx-auto flex justify-evenly items-center ">
            <IoLockClosedOutline className=" w-[10%] h-[90%] md:w-[5%] text-gray-600 my-auto"></IoLockClosedOutline>
            <input ref={cPassRef} className=" w-[85%] focus-within:outline-none" type={showPassword2 ? "text" : "password"} placeholder="Confirm Password" required>
            </input>
    
            <div onClick={()=>setShowPassword2(!showPassword2)} className=" absolute right-0 text-xl">
              {" "}
              {showPassword2 ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}{" "}
            </div>
          </div>)
      }


      {
        error!=="" && <div className="-mt-3 -mb-7 text-lg text-left w-[75%] text-red-600"> *{error}</div>
      }

      <div className=" w-full flex justify-evenly min-h-10 items-center ">
        <div className=" flex justify-center items-center">
        <input  id="remember" type="checkbox"  className="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded " />
          <label className=" text-gray-600" htmlFor="remember">Remember Password</label>
        </div>
        <div className=" text-blue-600  border-b hover:border-b-blue-600 cursor-pointer">Forgot Password</div>
      </div>

      <div className=" flex flex-col justify-center items-center gap-4 w-full">
        <button className=" bg-blue-500 w-[80%]  mx-auto text-xl py-2 cursor-pointer text-white rounded-xl">{isLogin ? "Login" : "Register"}</button>
        <div className=" text-gray-600">or connect with</div>
        <div className=" flex justify-evenly items-center w-[70%] text-2xl">
          <div className=" cursor-pointer rounded-full">
            <FaFacebook></FaFacebook>
          </div>
          <div className=" cursor-pointer rounded-full">
            <FaInstagram></FaInstagram>
          </div>
          <div className=" cursor-pointer rounded-full">
            <FaPinterest></FaPinterest>
          </div>
          <div className=" cursor-pointer rounded-full">
            <FaLinkedin></FaLinkedin>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Auth;
