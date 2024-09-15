import React, { useEffect } from "react";
import { IoLogoFigma , IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate()
  const User = useSelector((state)=>state.User.User);

  useEffect(()=>{
    if(!User){
      navigate("/")
    }
  } , [])

  return (
    <div className=" w-full min-h-[100vh] grad relative md:max-h-[50vh] md:max-w-[50%] mx-auto">
        <div className=" absolute text-5xl left-3 top-4 cursor-pointer" onClick={()=> navigate("/home")}><IoArrowBackCircleOutline></IoArrowBackCircleOutline></div>
      <div className=" flex  justify-evenly items-center h-[52vh] ">
        <IoLogoFigma className="text-8xl blur-sm bg-gradient-to-r from-green-300/60 via-purple-400/60 to-pink-500/10 text-white rounded-2xl " /><IoLogoFigma className="text-8xl blur-sm bg-gradient-to-r from-green-300/60 via-purple-400/60 to-pink-500/10 text-white rounded-2xl " /><IoLogoFigma className="text-8xl blur-sm bg-gradient-to-r from-green-300/60 via-purple-400/60 to-pink-500/20 text-white rounded-2xl " />
      </div>

      <div className=" bg-white text-black h-[48vh] w-full py-12 rounded-t-[43px] flex flex-col justify-start items-center px-10 gap-5">
        <div className=" text-4xl text-gray-800 ">Fruit.Ai</div>
        <div className=" w-[90%] mx-auto backdrop: text-gray-600 font-semibold text-center">Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.</div>
        <div className=" bg-black w-[80%] mx-auto flex justify-center items-center text-2xl py-3 rounded-3xl text-white font-semibold"> About </div>
      </div>
    </div>
  );
};

export default About;
