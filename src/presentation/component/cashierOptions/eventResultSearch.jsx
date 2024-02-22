import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getEventAction } from "../../../stores/events/getEventAction";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const EventResultSearch = () => {
  const initialDateFrom = new Date();
  const initialDateTo = new Date();
  initialDateFrom.setHours(0, 0, 0, 0);
  initialDateTo.setHours(0, 0, 0, 0);
  initialDateTo.setDate(initialDateFrom.getDate() + 1);

  const [selectedDateFrom, setSelectedDateFrom] = useState(initialDateFrom);
  const [selectedDateTo, setSelectedDateTo] = useState(initialDateTo);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameNumber, setGameNumber] = useState(0);
  const [gameId, setGameId] = useState(0);
  const [result, setResult] = useState([]);
  const [gameType, setGameType] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [slip, setSlip] = useState(null);
  const [updatedSlipData, setUpdatedSlipData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateChangeFrom = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDateFrom(newDate);
  };

  const handleDateChangeTo = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDateTo(newDate);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const body = {
      startTime: formatDateTime(selectedDateFrom),
      endTime: formatDateTime(selectedDateTo),
      gameNumber: gameNumber,
    };
    try {
      const response = await dispatch(getEventAction({ body }));
      if (response.payload) {
        setDisabled(true);
        setData(response.payload);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleReset = () => {
    setData(null);
    setDisabled(false);
    setLoading(false);
    setResult([]);
    setSlip([]);
  };

  const handleExportToExcel = () => {
    if (data === null) return alert("No data to export");
    else {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Game ID,From Date,To Date,Game Type\n";

      data?.forEach((rowArray) => {
        csvContent += rowArray.gameId + ",";
        csvContent += rowArray.startTime;
        csvContent += rowArray.endTime;
        csvContent += rowArray.type + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "EventResult.csv");

      document.body.appendChild(link); // Required for FF

      link.click();

      document.body.removeChild(link);
    }
  };

  const slicedArray = data?.slice(-25);
  const filteredAndSortedArray = slicedArray
    ?.filter((user) => user.gameId === (gameId === 0 ? user.gameId : gameId))
    .sort((a, b) => parseInt(b.gameId) - parseInt(a.gameId));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSlipData = slip;
      if (newSlipData) {
        setUpdatedSlipData(newSlipData);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [slip]);

  const generateUpdatedData = () => {
    return JSON.stringify({
      printContent: [
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
          LineItem: "Report Time: " + new Date().toLocaleString() + "UTC + 3",
          FontSize: 7,
          Bold: false,
          Alignment: 2,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "",
          FontSize: 7,
          Bold: false,
          Alignment: 2,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "Result Details",
          FontSize: 7,
          Bold: false,
          Alignment: 1,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "",
          FontSize: 7,
          Bold: false,
          Alignment: 2,
          NewLine: true,
          Underline: false,
        },

        {
          LineItem:
            "From Date: " +
            updatedSlipData?.startTime.slice(0, 10) +
            ", " +
            updatedSlipData?.startTime.slice(11, 16),
          FontSize: 6,
          Bold: false,
          Alignment: 0,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem:
            "To Date: " +
            updatedSlipData?.endTime.slice(0, 10) +
            ", " +
            updatedSlipData?.endTime.slice(11, 16),
          FontSize: 6,
          Bold: false,
          Alignment: 0,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "",
          FontSize: 7,
          Bold: false,
          Alignment: 2,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "Game Type: " + updatedSlipData?.type,
          FontSize: 6,
          Bold: false,
          Alignment: 0,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "Game ID: " + updatedSlipData?.gameId,
          FontSize: 6,
          Bold: false,
          Alignment: 0,
          NewLine: true,
          Underline: false,
        },
        {
          LineItem: "result: " + updatedSlipData?.result,
          FontSize: 5,
          Bold: false,
          Alignment: 0,
          NewLine: true,
          Underline: false,
        },
      ],
    });
  };

  const handlePrint = async () => {
    if (slip === null || slip === undefined) {
      alert("There's an error");
      return;
    } else {
      try {
        const printResponse = await fetch("http://localhost:8084/print", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: generateUpdatedData(
            localStorage.getItem("slipRef") || "Test Reference"
          ),
        });
        if (printResponse) {
        } else {
        }
      } catch (error) {}
    }
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
    <div
      className="w-full p-4 border-green-500 border-[1px]"
      style={{
        paddingBottom: "3rem",
      }}
    >
      <div className="flex flex-col gap-5 w-full p-2 border-grey-700 border-[1px]">
        <div className="flex w-full gap-7 max-w-[800px]">
          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">
              From Date
            </h3>

            <div className="relative rounded-md shadow-sm">
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                onChange={handleDateChangeFrom}
                value={formatDateTime(selectedDateFrom)}
                className="block w-full px-3 py-2 leading-5 transition duration-150 ease-in-out border border-black rounded-md form-input sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">To Date</h3>
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              onChange={handleDateChangeTo}
              value={formatDateTime(selectedDateTo)}
              className="block w-full px-3 py-2 leading-5 transition duration-150 ease-in-out border border-black rounded-md form-input sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>

          <div className="w-1/3">
            <h3 className="text-black text-[1rem] font-semibold">Event No</h3>
            <input
              type="number"
              className="px-3 rounded-md border-[1px] border-gray-500 w-full"
              onChange={(e) => setGameNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-7">
          <button
            className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] border-green-500"
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
            className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] w-fit border-green-500"
            onClick={handleReset}
          >
            <FaPrint className="fill-green-500" /> Clear
          </button>

          <button
            className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] border-green-500"
            onClick={handleExportToExcel}
          >
            <FaRegFileExcel className="fill-green-500" /> Export To Excel
          </button>
        </div>

        <div className="flex justify-end w-full">
          <p>
            Report Date: <span>{new Date().toLocaleString()}</span>
          </p>
        </div>

        <div className="w-full">
          {
            <div
              style={{
                maxHeight: "150px",
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
                  <tr className="text-[0.8rem] font-normal">
                    <th className="pl-5" scope="col">
                      Game ID
                    </th>

                    <th className="pl-5" scope="col">
                      From Date
                    </th>

                    <th className="pl-5" scope="col">
                      to Date
                    </th>
                    <th className="pl-5" scope="col">
                      Game Type
                    </th>
                    <th className="pl-5" scope="col"></th>
                    <th className="pl-5" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length === 0 ||
                    (data === null && !loading && (
                      <tr>
                        <td
                          colSpan={10}
                          className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap text-center py-5"
                        >
                          No data found
                        </td>
                      </tr>
                    ))}
                  {loading && data === null && (
                    <tr>
                      <td colSpan={10} className="py-5 text-center">
                        <div className="flex items-center justify-center">
                          <FaSpinner className="mr-2 text-green-500 animate-spin" />{" "}
                          Loading...
                        </div>
                      </td>
                    </tr>
                  )}

                  {filteredAndSortedArray?.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white"
                    >
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {user.gameId}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {user.startTime.slice(0, 10) +
                          ", " +
                          user.startTime.slice(11, 16)}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {user.endTime.slice(0, 10) +
                          ", " +
                          user.endTime.slice(11, 16)}
                      </td>
                      <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">
                        {user.type}
                      </td>
                      <td className="border-s-[1px] pl-11 border-gray-500 whitespace-nowrap">
                        <button
                          className="w-[60px] rounded-md h-[40px] border-[1px] border-green-500 bg-white"
                          onClick={() => {
                            setShowResult(true);
                            setResult(user.result);
                            setGameType(user.type);
                            setGameId(user.gameId);
                          }}
                        >
                          <FaRegEye className="w-full fill-green-500" />
                        </button>
                      </td>
                      <td className="border-s-[1px] pl-11 border-gray-500 whitespace-nowrap">
                        <button
                          className="w-[60px] rounded-md h-[40px] border-[1px] border-green-500 bg-white"
                          onClick={() => {
                            setSlip(user);
                            handlePrintAndCheckOnlineStatus();
                          }}
                        >
                          <FaPrint className="w-full fill-green-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
      {result?.length > 0 && showResult && (
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-2">
            <span className="font-bold text-green-600">Result:</span>
            <span className="ml-2">{gameType}</span>
            <span className="ml-2">(game Number: {gameId})</span>
            <button
              className="p-1 px-5 mt-2 ml-6 text-white bg-black bg-green-500 rounded-md"
              onClick={() => setShowResult(false)}
            >
              close
            </button>
          </div>
          <div className="flex gap-2">
            {result?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-gray-200 rounded-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventResultSearch;
