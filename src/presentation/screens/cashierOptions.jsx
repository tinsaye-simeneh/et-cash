import React, { useState, useEffect } from "react";
import EventResultSearch from "../component/cashierOptions/eventResultSearch";
import { IoMdRefresh } from "react-icons/io";
import Report from "../component/cashierOptions/report";
import clsx from "clsx";
import { getReportAction } from "../../stores/reports/getReportAction";
import { useDispatch } from "react-redux";

const CashierOptions = function (props) {
  const [currentPage, setCurrentPage] = useState("report");
  const dispatch = useDispatch();
  const [userBalance, setUserBalance] = useState(0);
  let username = localStorage.getItem("username");

  const getReport = async () => {
    const currentDate = new Date();

    // Set startOfDay to the beginning of the current day (00:00:00 UTC+3)
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    );
    startOfDay.setHours(startOfDay.getHours() + 3); // Add 3 hours to set it to UTC+3

    // Set endOfDay to the current time (UTC+3)
    const endOfDay = new Date();
    endOfDay.setHours(endOfDay.getHours() + 3); // Add 3 hours to set it to UTC+3

    const body = {
      startTime: startOfDay.toISOString(),
      endTime: endOfDay.toISOString(),
    };
    try {
      const response = await dispatch(getReportAction({ body }));
      if (response.payload) {
        const userData = response.payload[username];

        const objData = {
          deposits: userData.deposits,
          bets: userData.bets,
          cancellations: userData.cancellations,
          redeemed: userData.redeemed,
          withdraws: userData.withdraws,
          currentBalance: userData.currentBalance,
        };
        setUserBalance(objData.currentBalance);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      const interval = 30 * 60 * 1000;

      const removeTokenInterval = setInterval(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          localStorage.removeItem("token");
        }
      }, interval);

      return () => clearInterval(removeTokenInterval);
    }
  }, []);

  return (
    <div
      className={clsx(
        "absolute z-30 min-w-full h-fit min-h-full bg-darkGray bg-opacity-70 flex flex-col items-center",
        { hidden: props.currentTab !== "cashier" }
      )}
      style={{
        paddingBottom: "9.3rem",
      }}
    >
      <div className="w-[1200px] flex flex-col items-center bg-white gap-4 mt-20">
        <div className="flex justify-between w-full px-1 py-2 text-white bg-cashierOption">
          <h2>Cashier Options</h2>

          <div
            onClick={() => {
              props.setCurrentTab("");
            }}
            className="cursor-pointer bg-transparent h-[20px] w-[20px] relative"
          >
            <div className="absolute w-1/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-3/4"></div>
            <div className="absolute w-3/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-1/4"></div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-1 pr-5">
          <h3 className="font-normal text-green-500 text-[1.3rem]">Balance:</h3>

          <h2 className="font-medium text-green-600 text-[1.4rem]">
            Br {userBalance.toFixed(2)}
          </h2>

          <button
            className="p-1 flex gap-1 h-fit items-center rounded-md border-[1px] border-green-500 px-2"
            onClick={getReport}
          >
            <IoMdRefresh className="fill-green-500" />
          </button>
        </div>

        <div className="flex flex-col w-full px-5">
          <div className="flex justify-between w-full">
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setCurrentPage("report");
                }}
                className={clsx(
                  "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
                  { "bg-cashierOption": currentPage === "report" },
                  { "bg-white": currentPage !== "report" }
                )}
              >
                Reports
              </button>

              <button
                onClick={() => {
                  setCurrentPage("event");
                }}
                className={clsx(
                  "p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500",
                  { "bg-cashierOption": currentPage === "event" },
                  { "bg-white": currentPage !== "event" }
                )}
              >
                Event Result Search
              </button>
            </div>

            <button className="p-1 rounded-t-[6px] border-[1px] border-b-0 border-green-500 bg-white">
              Change Password
            </button>
          </div>

          {currentPage === "event" && <EventResultSearch />}
          {currentPage === "report" && <Report />}
        </div>
      </div>
    </div>
  );
};

export default CashierOptions;
