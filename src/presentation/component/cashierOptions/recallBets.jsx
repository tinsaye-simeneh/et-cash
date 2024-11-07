import React, { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import { getBetsAction } from "../../../stores/bet/getBetsAction";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const RecallBets = () => {
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slip, setSlip] = useState(null);
  const [printerOnline, setPrinterOnline] = useState("");
  const [printerLink, setPrinterLink] = useState("");

  const { userAgent } = navigator;
  let os = "";

  useEffect(() => {
    if (userAgent.indexOf("Win") !== -1) {
      if (userAgent.indexOf("Windows NT 10.0") !== -1) os += "10";
      if (userAgent.indexOf("Windows NT 6.2") !== -1) os += "8";
      if (userAgent.indexOf("Windows NT 6.1") !== -1) os += "7";
      if (userAgent.indexOf("Windows NT 6.0") !== -1) os += "Vista";
      if (userAgent.indexOf("Windows NT 5.1") !== -1) os += "XP";
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("X11") !== -1) {
      os = "UNIX";
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
    }

    if (os === "10") {
      setPrinterOnline("http://localhost:8080/ISONLINE/ISONLINE");
      setPrinterLink("http://localhost:8080/PRINT");
    } else if (os === "7") {
      setPrinterOnline("http://localhost:8084/isonline");
      setPrinterLink("http://localhost:8084/print");
    } else {
      setPrinterOnline("http://localhost:8080/ISONLINE/ISONLINE");
      setPrinterLink("http://localhost:8080/PRINT");
    }
  }, [
    userAgent,
    setPrinterOnline,
    setPrinterLink,
    os,
    setPrinterOnline,
    setPrinterLink,
  ]);
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setLoading(true);
    setData(null);
    try {
      const response = await dispatch(getBetsAction());

      if (response.payload) {
        // setDisabled(true);
        setData(response.payload);
      }
    } catch (err) {
      Notification({
        message: "An error occured, please try again",
        type: "error",
      });
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

  const mappedSelections = slip?.Selection?.map((item, index) => {
    return item;
  });

  const selectionsString = mappedSelections?.join(", ");

  let jsonData = JSON.stringify({
    printContent: [
      {
        LineItem: slip?.slipReference,
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
        LineItem: "Copy Ticket",
        FontSize: 8,
        Bold: false,
        Alignment: 1,
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
          "#" +
          slip?.gameIdNumber,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: selectionsString || "Selection",
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
      // {
      //   LineItem: "Min Payout (Incl. Stake)",
      //   FontSize: 9,
      //   Bold: true,
      //   Alignment: 0,
      //   NewLine: false,
      //   Underline: false,
      // },
      // {
      //   LineItem: "Br " + slip?.stake,
      //   FontSize: 9,
      //   Bold: true,
      //   Alignment: 2,
      //   NewLine: true,
      //   Underline: false,
      // },
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
        LineItem: slip?.slipReference || "reference",
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
      const printResponse = await fetch(printerLink, {
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
      const onlineResponse = await axios.post(printerOnline);
      if (onlineResponse.data) {
        handlePrint();
      } else {
        Notification({
          message: "Printer is offline",
          type: "error",
        });
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
                          style={{
                            fontSize: "1.3rem",
                          }}
                        >
                          No data found
                        </td>
                      </tr>
                    ))}
                  {loading && data === null && (
                    <tr>
                      <td colSpan={8} className="py-5 text-center">
                        <div
                          className="flex items-center justify-center"
                          style={{
                            fontSize: "1.5rem",
                          }}
                        >
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
                        {data.cashierUsername}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {data._id.slice(0, 4) + "..."}
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
                        {data.Selection?.map((item, index) => (
                          <span key={index}>
                            {item}
                            {index !== data.Selection.length - 1 && ", "}
                          </span>
                        ))}
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
