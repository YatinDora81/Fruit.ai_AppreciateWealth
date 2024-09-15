import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";
import ChatBox from "../components/ChatBox";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Chat = () => {

  const [allChats, setAllChats] = useState([
    {
      bot: true,
      text: "hello , i am chat bot , you can ask any question",
      date: new Date(),
    },
    { bot: false, text: "Hello", date: new Date() },
  ]);

  useEffect(() => {
    if (allChats.length > 2) {
      localStorage.setItem("chats", JSON.stringify(allChats));
    }
  }, [allChats]);

  useEffect(() => {
    const storedchats = localStorage.getItem("chats");
    // console.log(JSON.parse(storedchats));

    if (storedchats) {
      const arr = JSON.parse(storedchats);

      const chatsWithDates = arr.map((chat) => ({
        ...chat,
        date: new Date(chat.date),
      }));
      setAllChats([...chatsWithDates]);
    }
  }, []);

  const [text, setText] = useState("");

  const addChat = async () => {
    if (text.length < 3) return;

    setAllChats((prevChats) => [
      ...prevChats,
      { bot: false, text, date: new Date() },
    ]);

    try {
      const botResponse = await run(text);
      setAllChats((prevChats) => [
        ...prevChats,
        { bot: true, text: botResponse, date: new Date() },
      ]);
      setText("");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run(searchtext) {
    const query =
      "Act as a Food Recommendation system and suggest some good food fruits for the query: " +
      searchtext +
      ". Only give me a line of 20 to 25 words.";

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(query);
    return result.response.candidates[0].content.parts[0].text;
  }

  const navigate = useNavigate();
  const User = useSelector((state)=>state.User.User);

  useEffect(()=>{
    if(!User){
      navigate("/")
    }
  } , [])

  return (
    <div className="flex flex-col py-2 px-4 justify-start items-center w-full min-h-[100vh]  gap-5 md:max-h-[50vh] md:max-w-[50%] mx-auto md:gap-2">
      <div className="h-[15%] w-full flex justify-between items-center px-5 shadow-lg py-2">
        <div className="flex justify-evenly items-center gap-4">
          <FaAngleLeft onClick={() => navigate("/home")} />
          <img
            className="w-8 rounded-full border"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="User"
          />
          <div className="flex flex-col justify-center items-start">
            <div>John Doe</div>
            <div className="text-sm text-gray-600">online</div>
          </div>
        </div>

        <div className="text-xl">
          <BsThreeDotsVertical />
        </div>
      </div>

      <div className="h-[80vh] w-full">
        <ChatBox allChats={allChats} />
      </div>

      <div className="w-full h-[7vh] flex focus-within:outline-none px-2 justify-evenly items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addChat();
          }}
          className="rounded-full border border-black px-3 text-left w-[90%] h-[85%]"
          type="text"
          placeholder="Message..."
        />
        <RiSendPlane2Fill
          onClick={addChat}
          className="text-3xl px-1 h-[80%] w-[12%] bg-purple-500 text-white rounded-xl border border-black"
        />
      </div>
    </div>
  );
};

export default Chat;
