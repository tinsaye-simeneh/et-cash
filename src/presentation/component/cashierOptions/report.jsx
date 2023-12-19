import RecallBets from "./recallBets";
import React, {useState} from "react";
import Summary from "./summary";
import clsx from "clsx";

const Report = ()=>{

  const [subPage, setSubPage] = useState("summary");

  return (
    <div className="w-full p-3 px-10 border-green-500 border-[1px]">

      <div className="flex justify-start gap-1 w-full">
        <button
          onClick={()=>{setSubPage("summary")}}
          className= {clsx(
            "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
            {"bg-cashierOption": subPage === "summary"},
            {"bg-white": subPage !== "summary"}
          )}
        >
          Summary
        </button>

        <button onClick={()=>{setSubPage("recall")}}
                className= {clsx(
                  "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
                  {"bg-cashierOption": subPage === "recall"},
                  {"bg-white": subPage !== "recall"}
                )}
        >
          Recall Bets
        </button>
      </div>

      {subPage === 'summary' && <Summary />}
      {subPage === 'recall' && <RecallBets />}

    </div>
  )
}

export default Report;