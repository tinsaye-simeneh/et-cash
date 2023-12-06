import React from "react";
import {IoMdRefresh} from "react-icons/io";
import {FaPrint, FaRegEye} from "react-icons/fa";

const RecallBets = ()=>{
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
    <div className="w-full p-4 border-green-500 border-[1px]">

      <div className="flex flex-col w-full border-gray-500 border-[1px]">

        <div className="flex flex-col p-4 gap-4">

          <h2>Retail User</h2>

          <div className="w-[400px]">
            <select
              className="px-3 py-1 border rounded w-full bg-tableGray"
            >
              <option value={5}>All</option>
              <option value={10}>Cashier 2</option>
              <option value={20}>Cashier 3</option>
            </select>
          </div>

          <button className="p-1 flex gap-1 h-fit items-center rounded-[6px] border-[1px] w-fit border-green-500">
            <IoMdRefresh className="fill-green-500" /> Refresh
          </button>

        </div>

        <div className="w-full">
          {
            <table className="w-full text-left">
              <thead>
              <tr className="text-[1rem] font-normal">
                <th className="pl-5" scope="col">Retail User</th>
                <th className="pl-5" scope="col">Date</th>
                <th className="pl-5" scope="col">Stake</th>
                <th className="pl-5" scope="col">Description</th>
              </tr >
              </thead>
              <tbody>
              {data.map((user, index) => (
                <tr key={index} className="hover:bg-slipGray h-[45px] odd:bg-tableGray even:bg-white">
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.retailUser}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.fromDate}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.toDate}</td>
                  <td className="border-s-[1px] pl-5 border-gray-500 whitespace-nowrap">{user.startBalance}</td>

                </tr>
              ))}
              </tbody>
            </table>
          }

        </div>

      </div>
    </div>
  )
}

export  default RecallBets;