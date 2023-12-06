import React, {useState} from "react";
import clsx from "clsx";
import {MdKeyboardBackspace} from "react-icons/md";

const Redeem = (props)=>{

  const [input, setInput] = useState('');

  const handleClick = (char)=>{

    if (char === "10"){
      setInput((prevInput)=> prevInput + "L")
    }else if(char === "11"){
      setInput((prevInput)=> prevInput + "0")
    }
    else if(char === "12"){
      setInput((prevInput)=>prevInput.slice(0, prevInput.length - 1))
    }else{
      setInput((prevInput)=> prevInput + char)
    }

  }


  return (
    <div
      className={
        clsx(
          "absolute z-50 min-w-full min-h-full bg-darkGray bg-opacity-70 flex flex-col items-center",
          {"hidden": props.currentTab !== "redeem"},
        )}
    >

      <div className="w-[1200px] flex flex-col bg-white gap-4 mt-20 rounded-lg">

        <div className="flex justify-between px-1 py-2 bg-cashierOption w-full text-white rounded-t-lg px-5">

          <h2>Redeem Betslip</h2>

          <div onClick={()=>{props.setCurrentTab("")}} className="cursor-pointer bg-transparent h-[20px] w-[20px] relative">
            <div className="absolute rotate-45 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-darkGray w-1/4 h-3/4"></div>
            <div className="absolute rotate-45 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-darkGray w-3/4 h-1/4"></div>
          </div>

        </div>


        <div className="w-[400px] ml-8 flex flex-col gap-4 pb-10">

          <h2 className="text-green-600 text-[1.3rem]">
            Enter betslip code or scan
          </h2>

          <input
            className="border-[1px] border-gray-300 rounded-md w-11/12 px-2 py-2" type="text" value={input}
            onInput={(event)=>{ setInput(event.target.value)}}
          />

          <div className="grid grid-cols-3 gap-5">

            {
              [...Array(12).keys()].map((element)=>{
                return (
                  <div
                    key={element}
                    className=" w-full text-white bg-cashierOption h-full flex justify-center items-center p-3 rounded-lg cursor-pointer"
                    onClick={()=>{handleClick((element + 1).toString())}}
                  >
                    {
                      element === 9? "L": element === 10? 0: element === 11? <MdKeyboardBackspace fill={"white"} />: element + 1
                    }
                  </div>
                )
              })
            }

          </div>

          <div className="flex items-center justify-between px-3">

            <button onClick={()=>{setInput("")}} className="py-2 px-5 flex gap-1 h-fit items-center bg-tableGray rounded-md">
              Clear
            </button>

            <button className="py-2 px-5 flex gap-1 h-fit items-center bg-cashierOption text-white rounded-md">
              Enter
            </button>

          </div>

        </div>


      </div>
    </div>
  )
}

export default Redeem