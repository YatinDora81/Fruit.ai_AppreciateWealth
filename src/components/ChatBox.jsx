import React from 'react'




const ChatBox = ({allChats}) => {
  
    

    return (
    <div className='  w-full h-[100%] flex flex-col justify-start relative overflow-x-auto gap-5 '>
    

        {
            allChats.map((c,i)=> <div key={i} className={` flex flex-col justify-start  relative max-w-[65%] ${c.bot===true ? 'self-start' : "self-end "} `}>
            <div className={`text-xl rounded-2xl  px-4 py-5 leading-5  ${c.bot===true ? ' bg-gray-400' : " bg-purple-500 text-white"}  `}>
                {c?.text}
            </div>
            <div className={` text-sm text-gray-600 bottom-5  ${c.bot===true ? 'self-start' : "self-end pr-2 "}  `}> {c?.date?.getHours()} : {c?.date?.getMinutes()} { c?.date?.getHours() <12 ? "AM" : "PM" } </div>
        </div>)
        }


    </div>
  )
}

export default ChatBox