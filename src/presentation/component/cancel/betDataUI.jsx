import React, { useState } from "react";
import { TiCancel } from "react-icons/ti";
import { cancelAction } from "../../../stores/bet/cancelAction";
import { useDispatch } from "react-redux";
import axios from "axios";

const BetDataUI = (props) => {
  const { betData } = props;
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const mappedData = betData.currentBetData?.map((bet) => {
    return {
      gameType: bet.gameType,
      betType: bet.betType,
      selection: bet.selection.map((element) => element).join(","),
      odds: bet.odds,
      stake: bet.stake,
      createdAt: bet.createdAt,
      betWinnings: bet.odds * bet.stake,
    };
  });

  const formattedSlips = () =>
    mappedData.flatMap((slip) => [
      {
        LineItem: slip.betType,
        FontSize: 8,
        Bold: true,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "stake: " + slip.stake + ", Win: " + slip.betWinnings,
        FontSize: 7,
        Bold: true,
        Alignment: 2,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem:
          slip.gameType +
          ", " +
          slip.createdAt.slice(0, 10) +
          " at " +
          slip.createdAt.slice(11, 19),
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: slip.selection,
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
    ]);

  let jsonData = JSON.stringify({
    printContent: [
      {
        LineItem: betData.input,
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
        LineItem:
          "Cancel Time: " + new Date().toLocaleString() + " " + "UTC + 3",
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
        LineItem: "Cancel Ticket",
        FontSize: 10,
        Bold: false,
        Alignment: 1,
        NewLine: true,
        Underline: true,
      },
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      ...formattedSlips(),
      {
        LineItem: null,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: betData.input,
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

  const handleCancelBet = async () => {
    if (betData.currentBetData.length === 0) {
    } else {
      try {
        const response = await dispatch(cancelAction(betData.input));
        if (response.payload) {
          setSuccessMessage("Bet cancelled successfully");
          setButtonDisabled(true);
          handlePrintAndCheckOnlineStatus();
        } else {
          setErrMessage(
            "Bet cannot be cancelled. Please try again later or contact support"
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
                <th className="px-10 py-2">Ref.</th>
                <th className="px-10 py-2">ID</th>
                <th className="py-2 px-15">Date</th>
                <th className="py-2 px-7">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-t border-gray-400">
                <td className="px-4 py-0">{betData.input}</td>
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
          <span className="text-green-600">
            Bet winning amount:{"  "}
            {betData.currentBetData?.reduce(
              (acc, bet) => acc + bet.betWinnings,
              0
            )}
          </span>
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
