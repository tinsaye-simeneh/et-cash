import React, {useState} from "react";
import Summary from "../component/cashierOptions/summary";
import RecallBets from "../component/cashierOptions/recallBets";
import EventResultSearch from "../component/cashierOptions/eventResultSearch";
import {IoMdRefresh} from "react-icons/io";
import Report from "../component/cashierOptions/report";
import clsx from "clsx";


const CashierOptions = function (props){


  const [currentPage, setCurrentPage] = useState("report")

  return (
    <div
      className={
      clsx(
        "absolute z-30 min-w-full h-fit min-h-full bg-darkGray bg-opacity-70 flex flex-col items-center",
        {"hidden": props.currentTab !== "cashier"},
      )}>

      <div className="w-[1200px] flex flex-col items-center bg-white gap-4 mt-20">

        <div className="flex justify-between px-1 py-2 bg-cashierOption w-full text-white">

          <h2>Cashier Options</h2>

          <div onClick={()=>{props.setCurrentTab("")}} className="cursor-pointer bg-transparent h-[20px] w-[20px] relative">
            <div className="absolute rotate-45 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-darkGray w-1/4 h-3/4"></div>
            <div className="absolute rotate-45 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-darkGray w-3/4 h-1/4"></div>
          </div>

        </div>

        <div className="flex justify-end w-full items-center gap-1 pr-5">
          <h3 className="font-normal text-green-500 text-[1.3rem]">
            Balance:
          </h3>

          <h2 className="font-medium text-green-600 text-[1.4rem]">
            Br 0.0
          </h2>

          <button className="p-1 flex gap-1 h-fit items-center rounded-md border-[1px] border-green-500 px-2">
            <IoMdRefresh className="fill-green-500" />
          </button>
        </div>

        <div className="w-full flex flex-col px-5">

          <div className="flex justify-between w-full">
            <div className="flex gap-1">

              <button onClick={()=>{setCurrentPage("report")}}
                      className= {clsx(
                        "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
                        {"bg-cashierOption": currentPage === "report"},
                        {"bg-white": currentPage !== "report"}
                      )}
              >
                Reports
              </button>

              <button onClick={()=>{setCurrentPage("event")}}
                      className= {clsx(
                        "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
                        {"bg-cashierOption": currentPage === "event"},
                        {"bg-white": currentPage !== "event"}
                      )}
              >
                Event Result Search
              </button>

            </div>

            <button className="p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500 bg-white">
              Change Password
            </button>

          </div>

          {currentPage === 'event' && <EventResultSearch />}
          {currentPage === 'report' && <Report />}


        </div>


      </div>



    </div>
  )
}

export default CashierOptions;