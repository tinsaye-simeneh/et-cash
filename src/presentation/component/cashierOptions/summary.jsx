import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaPrint, FaRegFileExcel } from "react-icons/fa";

import { getReportAction } from "../../../stores/reports/getReportAction";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";

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
    const body = {
      startTime: selectedDateFrom.toISOString(),
      endTime: selectedDateTo.toISOString(),
    };
    try {
      const response = await dispatch(getReportAction({ body }));

      if (response.payload) {
        const userData = response.payload[username];
        setDisabled(true);

        const objData = {
          deposits: userData.deposits,
          bets: userData.bets,
          cancellations: userData.cancellations,
          redeemed: userData.redeemed,
          withdraws: userData.withdraws,
          currentBalance: userData.currentBalance,
        };
        setData(objData);
        console.log(objData);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleReset = () => {
    setData(null);
    setDisabled(false);
    setLoading(false);
  };

  const handleExportToExcel = () => {
    if (data === null) return alert("No data to export");
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
            <input
              className="border-[1px] border-gray-500 rounded-[3px]"
              type="datetime-local"
              onChange={handleDateChangeFrom}
              value={selectedDateFrom.toISOString().slice(0, 16)}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">To Date</h3>
            <input
              className="border-[1px] border-gray-500 rounded-[3px]"
              type="datetime-local"
              onChange={handleDateChangeTo}
              value={selectedDateTo.toISOString().slice(0, 16)}
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
                    Deposits
                  </th>
                  <th className="pl-2" scope="col">
                    Bets
                  </th>
                  <th className="pl-2" scope="col">
                    Cancellations
                  </th>
                  <th className="pl-2" scope="col">
                    Redeemed
                  </th>
                  <th className="pl-2" scope="col">
                    Withdraws
                  </th>
                  <th className="pl-2" scope="col">
                    End Balance
                  </th>
                </tr>
              </thead>
              <tbody className="border-t-[1px] border-gray-500">
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
                {data && (
                  <tr className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white text-center">
                    <button className="w-[60px] rounded-md h-[40px] my-2 border-[1px] px-4 border-green-500 bg-white">
                      <FaPrint className="w-full fill-green-500" />
                    </button>

                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {localStorage.getItem("username")}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {selectedDateFrom.toISOString().slice(0, 10) +
                        ", " +
                        selectedDateFrom.toISOString().slice(11, 19)}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {selectedDateTo.toISOString().slice(0, 10) +
                        ", " +
                        selectedDateTo.toISOString().slice(11, 19)}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.deposits}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.bets}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.cancellations}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.redeemed}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.withdraws}
                    </td>
                    <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">
                      {data.currentBalance}
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
