import React, { useState } from "react";
import {IoMdRefresh} from "react-icons/io";
import {FaPrint, FaRegFileExcel } from "react-icons/fa";
import { IoCaretForward, IoCaretBack, IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
const Summary = ()=>{

  const initialDateFrom = new Date();
  const initialDateTo = new Date();
  initialDateFrom.setHours(0, 0, 0, 0);
  initialDateTo.setHours(0, 0, 0, 0)
  initialDateTo.setDate(initialDateFrom.getDate() + 1)

  const [selectedDateFrom, setSelectedDateFrom] = useState(initialDateFrom);
  const [selectedDateTo, setSelectedDateTo] = useState(initialDateTo);

  const handleDateChangeFrom = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDateFrom(newDate);
  };

  const handleDateChangeTo = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDateTo(newDate);
  };



  const data = [
    {
      retailUser: 'User1',
      fromDate: '2023-01-01',
      toDate: '2023-01-31',
      startBalance: 1000,
      deposits: 200,
      bets: 300,
      cancellations: 50,
      redeemed: 100,
      withdraws: 150,
      endBalance: 1000 + 200 + 300 - 50 - 100 - 150,
      unclaimedWinnings: 50,
    },
    // Add more user data as needed
  ];


  return (
    <div className="w-full p-4 border-green-500 border-[1px] text-[0.8rem]">
      {/*summary detail*/}
      <div className="flex flex-col gap-5 w-full p-2 border-grey-500 border-[1px]">

        <div className="flex w-full gap-7">

          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">From Date</h3>
            <input className="border-[1px] border-gray-500 rounded-[3px]" type="datetime-local"  onChange={handleDateChangeFrom} value={selectedDateFrom.toISOString().slice(0, 16)}/>
          </div>

          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">To Date</h3>
            <input className="border-[1px] border-gray-500 rounded-[3px]" type="datetime-local" onChange={handleDateChangeTo} value={selectedDateTo.toISOString().slice(0, 16)}/>
          </div>

        </div>

        <div className="flex gap-7">

          <button className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] border-green-500">
            <IoMdRefresh className="fill-green-500" /> Refresh
          </button>

          <button className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] border-green-500">
            <FaRegFileExcel className="fill-green-500" /> Export To Excel
          </button>

        </div>

        <div className="flex w-full justify-end">

          <p>Report Date: <span>21/11/2023 07:09:23</span></p>

        </div>

        <div className="w-full overflow-x-scroll">
          {
            <table className="w-full text-left">
              <thead>
              <tr className="text-[0.8rem] font-normal">
                <th className="pl-2" scope="col"></th>
                <th className="pl-2" scope="col">Retail User</th>
                <th className="pl-2" scope="col">From Date</th>
                <th className="pl-2" scope="col">To Date</th>
                <th className="pl-2" scope="col">Start Balance</th>
                <th className="pl-2" scope="col">Deposits</th>
                <th className="pl-2" scope="col">Bets</th>
                <th className="pl-2" scope="col">Cancellations</th>
                <th className="pl-2" scope="col">Redeemed</th>
                <th className="pl-2" scope="col">Withdraws</th>
                <th className="pl-2" scope="col">End Balance</th>
                <th className="pl-2" scope="col">Unclaimed Winnings</th>
              </tr >
              </thead>
              <tbody className="border-t-[1px] border-gray-500">
              {data.map((user, index) => (
                <tr key={index} className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white">
                  <button className="w-[60px] rounded-md h-[40px] my-2 border-[1px] px-4 border-green-500 bg-white">
                    <FaPrint className="fill-green-500 w-full" />
                  </button>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.retailUser}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.fromDate}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.toDate}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.startBalance}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.deposits}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.bets}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.cancellations}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.redeemed}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.withdraws}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.endBalance}</td>
                  <td className="border-s-[1px] border-gray-500 pl-2 whitespace-nowrap">{user.unclaimedWinnings}</td>
                </tr>
              ))}
              </tbody>
            </table>
          }

        </div>

        <div className="flex items-center justify-center mt-4">

          <div
            className="w-[40px] h-[40px] flex justify-center items-center border cursor-pointer rounded-full"
          >
            <IoPlaySkipBack className="fill-green-400" />
          </div>

          <div
            className="w-[40px] h-[40px] flex justify-center items-center border cursor-pointer rounded-full"
          >
            <IoCaretBack className="fill-green-400" />
          </div>

          <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-cashierOption text-white">
            {1}
          </div>

          <div
            className="w-[40px] h-[40px] flex justify-center items-center border cursor-pointer rounded-full"
          >
            <IoCaretForward className="fill-green-400" />
          </div>

          <div
            className="w-[40px] h-[40px] flex justify-center items-center border cursor-pointer rounded-full"
          >
            <IoPlaySkipForward className="fill-green-400" />
          </div>

          <div className="ml-4">
            <select
              className="px-3 py-1 border rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <label className="mr-2">Items per page</label>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Summary;