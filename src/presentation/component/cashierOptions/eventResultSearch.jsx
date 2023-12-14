import React, {useState} from "react";
import { FaRegEye } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

const EventResultSearch = ()=>{

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


  return(
    <div className="w-full p-4 border-green-500 border-[1px]">
      {/*summary detail*/}
      <div className="flex flex-col gap-5 w-full p-2 border-grey-700 border-[1px]">

        <div className="flex w-full gap-7 max-w-[800px]">

          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">From Date</h3>
            <input className="border-[1px] border-gray-500 rounded-[3px]" type="datetime-local"  onChange={handleDateChangeFrom} value={selectedDateFrom.toISOString().slice(0, 16)}/>
          </div>

          <div className="flex flex-col">
            <h3 className="text-black text-[0.8rem] font-semibold">To Date</h3>
            <input className="border-[1px] border-gray-500 rounded-[3px]" type="datetime-local" onChange={handleDateChangeTo} value={selectedDateTo.toISOString().slice(0, 16)}/>
          </div>

          <div className="w-1/3">
            <h3 className="text-black text-[1rem] font-semibold">Event No</h3>
            <input type="text" className="px-3 rounded-md border-[1px] border-gray-500 w-full"/>
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

        <div className="w-full">
          {
            <table className="w-full text-left">
              <thead>
              <tr className="text-[0.8rem] font-normal">
                <th className="pl-5" scope="col">Game</th>
                <th className="pl-5" scope="col">Feed ID</th>
                <th className="pl-5" scope="col">Event No</th>
                <th className="pl-5" scope="col">Date</th>
                <th className="pl-5" scope="col"></th>
                <th className="pl-5" scope="col"></th>
              </tr >
              </thead>
              <tbody>
              {data.map((user, index) => (
                <tr key={index} className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white">
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.retailUser}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.fromDate}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.toDate}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.startBalance}</td>
                  <td className="border-s-[1px] pl-11 border-gray-500 whitespace-nowrap">
                    <button className="w-[60px] rounded-md h-[40px] border-[1px] border-green-500 bg-white">
                      <FaRegEye className="fill-green-500 w-full" />
                    </button>
                  </td>
                  <td className="border-s-[1px] pl-11 border-gray-500 whitespace-nowrap">
                    <button className="w-[60px] rounded-md h-[40px] border-[1px] border-green-500 bg-white">
                      <FaPrint className="fill-green-500 w-full" />
                    </button>
                  </td>
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
            {'<'}
          </div>

          <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-cashierOption text-white">
            {1}
          </div>

          <div
            className="w-[40px] h-[40px] flex justify-center items-center border cursor-pointer rounded-full"
          >
            {'>'}
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

export default EventResultSearch;