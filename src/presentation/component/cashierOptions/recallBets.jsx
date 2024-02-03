import React, { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import { getBetsAction } from "../../../stores/bet/getBetsAction";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const RecallBets = () => {
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slip, setSlip] = useState(null);

  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getBetsAction());

      if (response.payload) {
        setDisabled(true);
        setData(response.payload);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleReset = () => {
    setData(null);
    setDisabled(false);
    setLoading(false);
  };

  const slicedArray = data?.slice(0, 15);

  const totalStakeCalculater = (games) => {
    let ret = 0;
    for (let game of games) {
      ret += game.amount;
    }
    return ret;
  };

  let jsonData = JSON.stringify({
    printContent: [
      {
        LineItem: slip?.slipReference || "Slip Reference",
        FontSize: 8,
        Bold: false,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: localStorage.getItem("retailerName"),
        FontSize: 8,
        Bold: false,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: localStorage.getItem("username"),
        FontSize: 8,
        Bold: false,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Time: " + new Date().toLocaleString() + " " + "UTC + 3",
        FontSize: 7,
        Bold: false,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: slip?.betType,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Br " + slip?.stake,
        FontSize: 8,
        Bold: true,
        Alignment: 2,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem:
          slip?.gameType +
            slip?.createdAt.slice(0, 10) +
            " " +
            slip?.createdAt.slice(11, 19) +
            " " +
            slip?.gameIdNumber || "Game ID Number",
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: slip?.selection.join(", ") || "Selection",
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Total Stake",
        FontSize: 9,
        Bold: true,
        Alignment: 0,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem: "Br " + slip?.stake,
        FontSize: 9,
        Bold: false,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Min Payout (Incl. Stake)",
        FontSize: 9,
        Bold: true,
        Alignment: 0,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem: "Br " + slip?.stake,
        FontSize: 9,
        Bold: true,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Max Payout (Incl. Stake)",
        FontSize: 9,
        Bold: true,
        Alignment: 0,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem: "Br " + slip?.stake * slip?.odds,
        FontSize: 9,
        Bold: true,
        Alignment: 2,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: slip?.Reference || "reference",
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: false,
        Underline: false,
        isBarcode: true,
      },
    ],
  });

  const handlePrint = async () => {
    try {
      const printResponse = await fetch("http://localhost:8084/print", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      if (printResponse) {
      } else {
      }
    } catch (error) {}
  };

  const handlePrintAndCheckOnlineStatus = async () => {
    try {
      const onlineResponse = await axios.post("http://localhost:8084/isonline");
      if (onlineResponse.data) {
        handlePrint();
      } else {
        alert("please plug a printer");
      }
    } catch (error) {}
  };

  return (
    <div className="w-full p-4 border-green-500 border-[1px]">
      <div className="flex flex-col w-full border-gray-500 border-[1px]">
        <div className="flex flex-col gap-4 p-4">
          <h2>Retail User</h2>

          <div className="w-[400px]">
            <select className="w-full px-3 py-1 border rounded bg-tableGray">
              <option value={5}>All</option>
              <option value={10}>{localStorage.getItem("username")}</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] w-fit border-green-500"
              onClick={handleRefresh}
              disabled={disabled}
              style={{
                backgroundColor: disabled ? "" : "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <IoMdRefresh className="fill-green-500" /> Refresh
            </button>
            <button
              className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] w-fit border-green-500 ml-5"
              onClick={handleReset}
            >
              <FaPrint className="fill-green-500" /> Clear
            </button>
          </div>
        </div>

        <div className="w-full">
          {
            <div
              style={{
                maxHeight: "180px",
                overflowY: "auto",
                marginTop: "10px",
              }}
            >
              <table className="w-full text-left">
                <thead
                  style={{
                    textAlign: "left",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f1f5f9",
                  }}
                >
                  <tr className="text-[1rem] font-normal">
                    <th className="pl-5" scope="col">
                      Retail User
                    </th>
                    <th className="pl-5" scope="col">
                      Slip Id
                    </th>

                    <th className="pl-5" scope="col">
                      Game Type
                    </th>

                    <th className="pl-5" scope="col">
                      Bet Type
                    </th>
                    <th className="pl-5" scope="col">
                      Status
                    </th>
                    <th className="pl-5" scope="col">
                      Created At
                    </th>
                    <th className="pl-5" scope="col">
                      Selection
                    </th>
                    <th className="pl-5" scope="col">
                      stake
                    </th>
                    <th className="pl-5" scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.length === 0 ||
                    (data === null && !loading && (
                      <tr>
                        <td
                          colSpan={8}
                          className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap text-center py-5"
                        >
                          No data found
                        </td>
                      </tr>
                    ))}
                  {loading && data === null && (
                    <tr>
                      <td colSpan={8} className="py-5 text-center">
                        <div className="flex items-center justify-center">
                          <FaSpinner className="mr-2 text-green-500 animate-spin" />{" "}
                          Loading...
                        </div>
                      </td>
                    </tr>
                  )}

                  {slicedArray?.map((data, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white"
                    >
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {localStorage.getItem("username")}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.slipId.slice(0, 4) + "..."}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.gameType}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.betType}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.status.split("-")[0]}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.createdAt && data.createdAt.split("T")[0]} at{" "}
                        {data.createdAt &&
                          data.createdAt.split("T")[1].split(".")[0]}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.selection
                          ? data.selection.join(", ")
                          : data.selection}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data.stake}
                      </td>
                      <button
                        className="w-[60px] rounded-md h-[40px] my-2 border-[1px] px-4 border-green-500 bg-white"
                        onClick={() => {
                          setSlip(data);
                          handlePrintAndCheckOnlineStatus();
                        }}
                      >
                        <FaPrint className="w-full fill-green-500" />
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RecallBets;
