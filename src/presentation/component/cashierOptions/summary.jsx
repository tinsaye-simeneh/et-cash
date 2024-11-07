import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaPrint, FaRegFileExcel } from "react-icons/fa";

import { getReportAction } from "../../../stores/reports/getReportAction";
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

const Summary = () => {
  const initialDateFrom = new Date();
  const initialDateTo = new Date();
  initialDateFrom.setHours(0, 0, 0, 0);
  initialDateTo.setHours(0, 0, 0, 0);
  initialDateTo.setDate(initialDateFrom.getDate() + 1);

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(initialDateFrom);
  const [selectedDateTo, setSelectedDateTo] = useState(initialDateTo);
  const dispatch = useDispatch();
  let username = localStorage.getItem("username");
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

    if (os === "7") {
      setPrinterOnline("http://localhost:8080/ISONLINE/ISONLINE");
      setPrinterLink("http://localhost:8080/PRINT");
    } else if (os === "10") {
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

  const [data, setData] = useState([]);

  const handleRefresh = async () => {
    setLoading(true);
    setData(null);
    const body = {
      startTime: formatDateTime(selectedDateFrom),
      endTime: formatDateTime(selectedDateTo),
    };
    try {
      const response = await dispatch(getReportAction({ body }));

      if (response.payload) {
        // setDisabled(true);

        const cashierUsername = localStorage.getItem("username");

        const filteredData = response.payload.filter(
          (item) => item.cashierUsername === cashierUsername
        );

        if (filteredData.length > 0) {
          setData(filteredData[0]);
        } else {
          setLoading(false);
          setData([
            {
              bets: 0,
              betWinnings: 0,
              cancellations: 0,
              redeemed: 0,
              unclaimed: 0,
              net: 0,
              cashierUsername: cashierUsername,
            },
          ]);
        }
      }
    } catch (error) {
      setData(null);
    }
  };

  const handleReset = () => {
    setData(null);
    setDisabled(false);
    setLoading(false);
  };

  const handleExportToExcel = () => {
    if (data === null)
      return Notification({
        message: "No data to export",
        type: "error",
      });
    else {
      let csv = [];
      const selectedDateFromSliced = selectedDateFrom
        .toISOString()
        .slice(0, 10);
      const selectedDateToSliced = selectedDateTo.toISOString().slice(0, 10);
      const selectedTimeFrom = selectedDateFrom.toISOString().slice(11, 19);
      const selectedTimeTo = selectedDateTo.toISOString().slice(11, 19);
      csv.push({
        RetailUser: localStorage.getItem("username"),
        FromDate: selectedDateFromSliced,
        FromTime: selectedTimeFrom,
        ToDate: selectedDateToSliced,
        ToTime: selectedTimeTo,
        Deposits: data.deposits,
        Bets: data.bets,
        Cancellations: data.cancellations,
        Redeemed: data.redeemed,
        Withdraws: data.withdraws,
        EndBalance: data.deposits - data.currentBalance,
      });

      const csvFromArrayOfObjects = (data) => {
        const columnDelimiter = ",";
        const lineDelimiter = "\n";
        let keys = Object.keys(data[0]);
        let result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        data.forEach((item) => {
          let ctr = 0;
          keys.forEach((key) => {
            if (ctr > 0) result += columnDelimiter;
            result += item[key];
            ctr++;
          });
          result += lineDelimiter;
        });
        return result;
      };
      const download = (data, filename) => {
        const link = document.createElement("a");
        link.style.display = "none";
        link.setAttribute("target", "_blank");
        link.setAttribute(
          "href",
          "data:text/csv;charset=utf-8," + encodeURIComponent(data)
        );
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      download(csvFromArrayOfObjects(csv), "report.csv");
    }
  };

  const mappedData = data;

  let jsonData = JSON.stringify({
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
        LineItem: "Report Details",
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
          formatDateTime(selectedDateFrom).slice(0, 10) +
          ", " +
          formatDateTime(selectedDateFrom).slice(11, 19) +
          " UTC + 3",
        FontSize: 7,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem:
          "To Date: " +
          formatDateTime(selectedDateTo).slice(0, 10) +
          ", " +
          formatDateTime(selectedDateTo).slice(11, 19) +
          " UTC + 3",
        FontSize: 7,
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
        LineItem: "Bets: " + mappedData?.bets,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Deposits: " + mappedData?.betWinnings,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Cancellations: " + mappedData?.cancellations,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Redeemed: " + mappedData?.redeemed,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Withdraws: " + mappedData?.unclaimed,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "End Balance: " + mappedData?.net,
        FontSize: 8,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: false,
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

  useEffect(() => {
    setData(null);
  }, []);

  return (
    <div className="w-full p-4 border-green-500 border-[1px] text-[0.8rem]">
      {/*summary detail*/}
      <div className="flex flex-col gap-5 w-full p-2 border-grey-500 border-[1px]">
        <div className="flex w-full gap-7">
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

        <div className="w-full overflow-x-scroll">
          {
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.8rem] font-normal">
                  <th className="pl-2" scope="col"></th>
                  <th className="pl-2" scope="col">
                    Retail User
                  </th>
                  <th className="pl-2" scope="col">
                    From Date
                  </th>
                  <th className="pl-2" scope="col">
                    To Date
                  </th>

                  <th className="pl-2" scope="col">
                    Bets
                  </th>
                  <th className="pl-2" scope="col">
                    Bet Winning
                  </th>
                  <th className="pl-2" scope="col">
                    Cancellations
                  </th>
                  <th className="pl-2" scope="col">
                    Redeemed
                  </th>
                  <th className="pl-2" scope="col">
                    Unclaimed
                  </th>
                  <th className="pl-2" scope="col">
                    End Balance
                  </th>
                </tr>
              </thead>
              <tbody className="border-t-[1px] border-gray-500">
                {/* {data?.length === 0 ||
                  (data === null && !loading && (
                    <tr>
                      <td
                        colSpan={10}
                        className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap text-center py-5"
                        style={{
                          fontSize: "1.3rem",
                        }}
                      >
                        No data found
                      </td>
                    </tr>
                  ))} */}
                {loading && data === null && (
                  <tr>
                    <td colSpan={10} className="py-5 text-center">
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
                {data && (
                  <tr className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white text-center">
                    <button
                      className="w-[60px] rounded-md h-[40px] my-2 border-[1px] px-4 border-green-500 bg-white"
                      onClick={handlePrintAndCheckOnlineStatus}
                    >
                      <FaPrint className="w-full fill-green-500" />
                    </button>

                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {localStorage.getItem("username")}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {formatDateTime(selectedDateFrom).slice(0, 10) +
                        ", " +
                        formatDateTime(selectedDateFrom).slice(11, 19)}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {formatDateTime(selectedDateTo).slice(0, 10) +
                        ", " +
                        formatDateTime(selectedDateTo).slice(11, 19)}
                    </td>

                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.bets ? data.bets : 0}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.betWinnings ? data.betWinnings : 0}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.cancellations ? data.cancellations : 0}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.redeemed ? data.redeemed : 0}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.unclaimed ? data.unclaimed : 0}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.net ? data.net : 0}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
};

export default Summary;
