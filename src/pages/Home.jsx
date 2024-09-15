import React, { useEffect } from 'react'
import { SiGoogletranslate } from "react-icons/si";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const User = useSelector((state)=>state.User.User);

  useEffect(()=>{
    if(!User){
      navigate("/")
    }
  } , [])

  return (
    <div className='grad w-full px-8 py-16 flex justify-start items-center flex-col gap-4 min-h-[100vh] md:max-h-[50vh] md:max-w-[50%] mx-auto'>
        
        <div className=' text-white text-4xl '>Fruit.Ai</div>
        <div className=' text-white text-xl'>"Be Healthy!"</div>

        <div className=' min-h-[75vh] w-full flex justify-evenly items-center flex-wrap'>

            <div className='flex justify-center items-center text-5xl border-2 w-[45%] h-[18vh] font-bold text-purple-700 bg-yellow-200 backdrop-blur-3xl rounded-xl cursor-pointer' onClick={()=> navigate("/chat")}>Chat.</div>
            <div className=' border-2 bg-lime-400 blur-lg  w-[45%] h-[18vh]'></div>
            <div className='  border-2 bg-lime-200 blur-lg  w-[45%] h-[18vh]'></div>
            <div className='flex justify-center items-center text-7xl border-2 w-[45%] h-[18vh] font-bold text-blue-600 backdrop-blur-3xl rounded-xl cursor-pointer bg-sky-200'><SiGoogletranslate></SiGoogletranslate></div>
            <div className=' flex justify-center items-center text-5xl w-[45%] h-[18vh] font-bold  text-blue-800 bg-purple-300 backdrop-blur-3xl rounded-xl cursor-pointer' onClick={()=> navigate("/faqs")}>FAQs</div>
            <div onClick={()=> navigate("/about")} className='flex justify-center items-center text-4xl border-2 w-[45%] h-[18vh] font-bold  text-pink-500 bg-pink-200 backdrop-blur-3xl rounded-xl cursor-pointer'>About</div>
        </div>

    </div>
  )
}

export default Home