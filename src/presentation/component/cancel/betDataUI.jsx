import React, { useState } from "react";
import { TiCancel } from "react-icons/ti";
import { cancelAction } from "../../../stores/bet/cancelAction";
import { useDispatch } from "react-redux";

const BetDataUI = (props) => {
  const { betData } = props;
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleCancelBet = async () => {
    if (betData.currentBetData.length === 0) {
    } else {
      try {
        const response = await dispatch(
          cancelAction(betData.currentBetData[0].slipId)
        );
        if (response.payload) {
          setSuccessMessage("Bet cancelled successfully");
          setButtonDisabled(true);
        } else {
          setErrMessage(
            "Bet cannot be cancelled. The time limit for cancellation has expired"
          );
        }
      } catch (error) {}
    }
  };

  return (
    <div className="flex flex-col items-center">
      {errMessage && (
        <div
          className="flex items-center gap-1 px-5 py-2 mb-5 text-white h-fit"
          style={{ backgroundColor: "#ff0000" }}
        >
          {errMessage}
          <div
            onClick={() => {
              setErrMessage("");
            }}
            className="cursor-pointer bg-transparent h-[20px] w-[20px] relative ml-10"
          >
            <div className="absolute w-1/4 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-3/4"></div>
            <div className="absolute w-3/4 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="flex items-center gap-1 px-5 py-2 mb-5 text-white h-fit bg-quickPick">
          {successMessage}
          <div
            onClick={() => {
              setSuccessMessage("");
            }}
            className="cursor-pointer bg-transparent h-[20px] w-[20px] relative ml-10"
          >
            <div className="absolute w-1/4 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-3/4"></div>
            <div className="absolute w-3/4 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
          </div>
        </div>
      )}
      <>
        <h2 className="text-green-600 text-[1.3rem] flex justify-between w-full px-5 rounded-t-lg">
          Bet Slip
        </h2>
        <div className="flex flex-col justify-between w-full px-4 py-2">
          <table className="w-full mb-4 table-auto">
            <thead>
              <tr>
                <th className="py-2 px-14">ID</th>
                <th className="px-24 py-2">Date</th>
                <th className="px-24 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-t border-gray-400">
                <td className="px-4 py-0">
                  {betData.currentBetData && betData.currentBetData[0].slipId}
                </td>
                <td className="px-4 py-0">
                  {betData.currentBetData &&
                    betData.currentBetData[0].createdAt.slice(0, 10)}
                </td>
                <td className="px-4 py-0">
                  {betData.currentBetData &&
                    betData.currentBetData[0].createdAt.slice(11, 19)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-green-600 text-[1.3rem] flex justify-between w-full px-5 rounded-t-lg mt-3">
          Bets
        </h2>
        <div
          style={{ maxHeight: "180px", overflowY: "auto", marginTop: "10px" }}
        >
          <table className="table-auto ">
            <thead
              style={{
                textAlign: "left",
                position: "sticky",
                top: 0,
                backgroundColor: "#f1f5f9",
              }}
            >
              <tr className="bg-gray">
                <th className="py-2 px-7">Bet ID </th>
                <th className="py-2 px-7">Game</th>
                <th className="py-2 px-7">Market</th>
                <th className="py-2 px-7">Selection</th>
                <th className="py-2 px-7">Odds</th>
                <th className="py-2 px-7">To Win</th>
              </tr>
            </thead>
            <tbody>
              {betData.currentBetData?.map((bet) => {
                return (
                  <tr className="text-center" key={bet.betId}>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.gameId.slice(0, 4) + "..."}
                    </td>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.gameType}
                    </td>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.betType}
                    </td>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.selection
                        .map((element, index) => {
                          return index === bet.selection.length - 1
                            ? element
                            : element + ",";
                        })
                        .join("")}
                    </td>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.odds}
                    </td>
                    <td className="px-0 py-2 border border-gray-400">
                      {bet.odds * bet.stake}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between w-full px-4 pt-2">
          <button
            className="flex items-center gap-1 px-5 py-2 mt-5 ml-auto text-white rounded-md h-fit bg-CancelTop"
            onClick={handleCancelBet}
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? "#ccc" : "" }}
          >
            Cancel
            <TiCancel className="fill-white" />
          </button>
        </div>
      </>
    </div>
  );
};

export default BetDataUI;
