import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaHeading } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiTextB, PiTextbox } from "react-icons/pi";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";

const Faqs = () => {
  const navigate = useNavigate();

  const User = useSelector((state)=>state.User.User);

  useEffect(()=>{
    if(!User){
      navigate("/")
    }
  } , [])

  const [openModel, setOpenModel] = useState(false);
  const [allFaqs, setAllFaqs] = useState([
    {
      heading: "How is Tangerine healthy?",
      content:
        "Tangerine are a great health booster due to their high vitamin C content, which supports the immune system and skin health.",
    },
  ]);

  const [head, setHead] = useState("");
  const [cont, setCont] = useState("");
  const addFaq = (e) => {
    e.preventDefault();
    setAllFaqs((prev) => [{ heading: head, content: cont }, ...prev]);
    setOpenModel(false);
    //reset value
    setCont("");
    setHead("");
    
  };

  useEffect(() => {
    if (allFaqs.length > 1) {
      localStorage.setItem("faqs", JSON.stringify(allFaqs));
    }
  }, [allFaqs]);

  
  useEffect(() => {
    const storedFaqs = localStorage.getItem("faqs");
    if (storedFaqs) {
      setAllFaqs(JSON.parse(storedFaqs));
    }
  }, []);

  return (
    <div className="w-full min-h-[100vh] grad flex justify-start py-10 items-center flex-col px-8 gap-9 relative md:min-h-[100vh] md:max-w-[50%] mx-auto">
      {!openModel && (
        <div
          onClick={() => setOpenModel(true)}
          className=" fixed z-[100] bottom-8 right-5 md:right-[25rem] bg-blue-600 text-white p-4 text-4xl font-bold rounded-full "
        >
          {" "}
          <BiPlus></BiPlus>{" "}
        </div>
      )}

      {openModel && (
        <form
          onSubmit={(e) => addFaq(e)}
          className=" absolute bg-white w-[70%]  h-[40vh] top-60 flex justify-center items-center flex-col gap-10"
        >
          <div
            className=" self-end px-10 text-2xl"
            onClick={() => setOpenModel(false)}
          >
            <CgClose />
          </div>

          <div className=" border-b border-b-gray-800 w-[80%] min-h-10 mx-auto flex justify-evenly items-center ">
            <input
              className=" w-[85%] focus-within:outline-none text-2xl"
              type="text"
              placeholder="Heading"
              value={head}
              onChange={(e) => setHead(e.target.value)}
              required
            ></input>
          </div>

          <div className=" border-b border-b-gray-800 w-[80%] min-h-10 mx-auto flex justify-evenly items-center ">
            <input
              className=" w-[85%] focus-within:outline-none text-2xl"
              type="text"
              placeholder="Content"
              value={cont}
              onChange={(e) => setCont(e.target.value)}
              required
            ></input>
          </div>

          <button className=" bg-blue-500 w-[80%] mx-auto text-3xl text-white py-2 px-3">
            {" "}
            Add Faq{" "}
          </button>
        </form>
      )}

      <div
        className=" absolute text-5xl left-3 top-10 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <IoArrowBackCircleOutline></IoArrowBackCircleOutline>
      </div>
      <div className=" text-4xl text-white "> Faq Section </div>
      <div className=" flex flex-col  justify-evenly items-center gap-2">
        {allFaqs.map((ele, i) => (
          <div
            key={i}
            className=" flex p-5 gap-4 bg-white/90 shadow-lg rounded-2xl "
          >
            <img className=" w-[30%]" src="./orange.jpg"></img>

            <div>
              <div className=" text-xl text-red-600">{ele?.heading}</div>
              <div className=" text-sky-600">{ele?.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
