import { ReactComponent as HorseIcon } from "../../assets/icons/DashingDerbyIcon.svg";
import { ReactComponent as DogIcon } from "../../assets/icons/PlatinumHoundsIcon.svg";
import { ReactComponent as WorldCupIcon } from "../../assets/icons/WorldCupFootballGroupIcon.svg";
import { ReactComponent as MotorIcon } from "../../assets/icons/MotorRacingIcon.svg";
import { ReactComponent as SpinIcon } from "../../assets/icons/SpinAndWinIcon.svg";
import { ReactComponent as KenoIconActive } from "../../assets/icons/SmartPlayKenoIconGreen.svg";
import { ReactComponent as KenoIconNotActive } from "../../assets/icons/SmartPlayKenoIconGray.svg";
import { ReactComponent as KenoIconSlip } from "../../assets/icons/SmartPlayKenoIconSlip.svg";

import { TiCancel } from "react-icons/ti";
import { BiDollar } from "react-icons/bi";
import axios from "axios";
import {
  changeInput,
  removeGame,
  changeValue,
  removeGames,
  IncreaseValue,
} from "../../stores/betslip/betslipSlice";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import CashierOptions from "./cashierOptions";
import Cancel from "./cancel";
import Redeem from "./redeem";
import DateTimeCounter from "../component/home/dateTimeCounter";
import { placeAction } from "../../stores/bet/placeAction";

const Home = () => {
  const location = useLocation();
  const [kenoTime, setKenoTime] = useState("");
  const [spinTime, setSpinTime] = useState("");
  const [betSuccess, setBetSuccess] = useState(false);
  const [betInvalid, setBetInvalid] = useState(false);
  const [isPlaceBetDisabled, setIsPlaceBetDisabled] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [stakeValue, setStakeValue] = useState(0);

  const slipsContainerRef = useRef(null);

  const slips = useSelector((state) => state.betslip.value);
  const dispatch = useDispatch();
  const [slipRef, setSlipRef] = useState("");

  const handleClickForPlusMinus = (valueObject) => {
    dispatch(changeValue(valueObject));
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/login";
    }
    if (
      localStorage.getItem("retailerName") === null ||
      localStorage.getItem("retailerName") === undefined
    ) {
      alert("The User is not assigned to any retailer");
      window.location.href = "/login";
    } else {
      const interval = 30 * 60 * 1000;

      const removeTokenInterval = setInterval(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          localStorage.removeItem("token");
        }
      }, interval);

      return () => clearInterval(removeTokenInterval);
    }
  }, []);

  useEffect(() => {
    if (slipsContainerRef.current) {
      slipsContainerRef.current.scrollTop =
        slipsContainerRef.current.scrollHeight;
    }
  }, [slips]);

  useEffect(() => {
    setKenoTime(localStorage.getItem("KenoTime"));
    setSpinTime(localStorage.getItem("spinTime"));

    if (location.pathname === "/") {
      const kenoTimer = setInterval(() => {
        const endTime = new Date(kenoTime).getTime();
        const currentTime = new Date().getTime();
        const time = Math.floor((endTime - currentTime) / 1000);
        if (time <= 0) {
          clearInterval(kenoTimer);
          localStorage.removeItem("KenoTime");
          localStorage.removeItem("kenogameId");
          dispatch(removeGames());
        }
      }, 1000);

      return () => {
        clearInterval(kenoTimer);
      };
    } else if (location.pathname === "/spin") {
      const spinTimer = setInterval(() => {
        const endTime = new Date(spinTime).getTime();
        const currentTime = new Date().getTime();
        const time = Math.floor((endTime - currentTime) / 1000);
        if (time <= 0) {
          clearInterval(spinTimer);
          localStorage.removeItem("spinTime");
          localStorage.removeItem("spingameId");
          dispatch(removeGames());
        }
      }, 1000);

      return () => {
        clearInterval(spinTimer);
      };
    }
  }, [kenoTime, spinTime, location.pathname, dispatch]);

  const totalAmountCalculater = (games) => {
    let ret = 0;
    for (let game of games) {
      ret += game.amount;
    }
    return ret;
  };

  const maxValueFinder = () => {
    let maxValue = 0;
    slips.forEach((game) => {
      maxValue = game.amount > maxValue ? game.amount : maxValue;
    });

    return maxValue;
  };

  const minWinCalculater = () => {
    let minPayout = Infinity;

    slips?.forEach((game) => {
      const payout = game.odd * game.amount;

      if (payout < minPayout) {
        minPayout = payout;
      }
    });

    return minPayout === Infinity ? 0 : minPayout;
  };

  const totalWinCalculater = (games) => {
    let ret = 0;
    for (let game of games) {
      ret += game.amount * game.odd;
    }
    return ret;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("assignedTo");
    localStorage.removeItem("retailerName");
    window.location.href = "/login";
  };

  const handleInput = (event) => {
    dispatch(
      changeInput({
        date: event.target.dataset.date,
        value: event.target.value,
      })
    );
  };

  const handlebetPlaceResponse = async () => {
    let bets = [];
    let games = [];

    slips.forEach((slip) => {
      games.push(slip?.gameUuid);

      let selectionValue;

      if (
        slip.game === "corner" ||
        slip.game === "split" ||
        slip.game === "sectors" ||
        slip.game === "neighbours" ||
        slip.game === "sixline"
      ) {
        const splitValues = slip.value
          .split("/")
          .map((value) => parseInt(value, 10));
        selectionValue = splitValues;
      } else if (slip.game === "win" && slip.gameType === "SpinAndWin") {
        selectionValue = [parseInt(slip.value)];
      } else if (slip.game === "win" && slip.gameType === "Keno") {
        selectionValue = slip.value.split(",").map(Number);
      } else {
        selectionValue = slip.value;
      }

      bets.push({
        gameType: slip.gameType,
        betType: slip.game,
        selection: selectionValue,
        stake: slip.amount,
      });
    });

    const body = {
      games,
      bets,
    };

    try {
      const response = await dispatch(placeAction({ body }));

      if (response.payload) {
        localStorage.setItem("slipRef", response.payload?.slipReference);
        setBetSuccess(true);
        handlePrintAndCheckOnlineStatus();
        dispatch(removeGames());
        localStorage.setItem("betSuccess", "true");
        setTimeout(() => {
          setBetSuccess(false);
        }, 3000);
        setTimeout(() => {
          localStorage.removeItem("betSuccess", "false");
        }, 2000);
      } else {
        setBetInvalid(true);
        setTimeout(() => {
          setBetInvalid(false);
        }, 3000);
        dispatch(removeGames());
        return;
      }
    } catch (err) {
      setBetInvalid(true);
      dispatch(removeGames());
      return;
    }
  };

  const mappedSlip = slips.map((slip) => {
    return {
      slipGame: slip.game,
      slipGameType: slip.gameType,
      slipDate: slip.date,
      slipValue: slip.value,
      slipGameId: slip.gameId,
      slipOdd: slip.odd,
      slipAmount: slip.amount,
    };
  });

  const formattedSlips = () =>
    mappedSlip.flatMap((slip) => [
      {
        LineItem: slip.slipGame,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: "Br " + slip.slipAmount,
        FontSize: 8,
        Bold: true,
        Alignment: 2,
        NewLine: false,
        Underline: false,
      },
      {
        LineItem:
          slip.slipGameType + " " + slip.slipDate + "#" + slip.slipGameId,
        FontSize: 8,
        Bold: false,
        Alignment: 0,
        NewLine: true,
        Underline: false,
      },
      {
        LineItem: slip.slipValue,
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSlipRef = localStorage.getItem("slipRef");
      if (newSlipRef !== slipRef) {
        setSlipRef(newSlipRef);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [slips, slipRef]);

  const generateUpdatedData = (newSlipRef) => {
    return JSON.stringify({
      printContent: [
        {
          LineItem: newSlipRef,
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
          LineItem: "Total Stake",
          FontSize: 9,
          Bold: true,
          Alignment: 0,
          NewLine: false,
          Underline: false,
        },
        {
          LineItem: "Br " + totalAmountCalculater(slips),
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
        //   LineItem: "Br " + minWinCalculater(),
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
          LineItem: "Br " + totalWinCalculater(slips),
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
          LineItem: newSlipRef,
          FontSize: 8,
          Bold: false,
          Alignment: 1,
          NewLine: false,
          Underline: false,
          isBarcode: true,
        },
      ],
    });
  };

  const handlePrint = async () => {
    if (
      localStorage.getItem("slipRef") === null ||
      localStorage.getItem("slipRef") === undefined
    ) {
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

  const handlePlaceBet = async () => {
    setIsPlaceBetDisabled(true);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      alert("Your session is expired, Please login first");
      window.location.href = "/login";
      setIsPlaceBetDisabled(false);
      return;
    } else if (slips.length === 0) {
      alert("Please add games first");
      setIsPlaceBetDisabled(false);
      return;
    } else {
      await handlebetPlaceResponse();
      setIsPlaceBetDisabled(false);
    }
  };

  return (
    <div className="relative">
      <CashierOptions currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <Cancel currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <Redeem currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="flex justify-between px-2 py-3 shadow-lg ps-10">
        <p className="text-xl text-green-500">Retail Logo</p>

        <div className="flex justify-center gap-2 text-white">
          <button
            onClick={() => {
              setCurrentTab("cashier");
            }}
            className="rounded-[4px] py-2 px-[10px] bg-cashierOption"
          >
            Cashier Options
          </button>
          <button
            onClick={() => {
              setCurrentTab("cancel");
            }}
            className="rounded-[4px] py-2 px-[10px] bg-CancelTop flex items-center gap-1"
          >
            Cancel
            <TiCancel className="fill-white" />
          </button>
          <button
            onClick={() => {
              setCurrentTab("redeem");
            }}
            className="rounded-[4px] py-2 px-[10px] bg-redeem flex items-center"
          >
            Redeem
            <BiDollar className="fill-white" />
          </button>
        </div>

        <div className="flex flex-col items-end">
          <DateTimeCounter />
          <div className="flex items-center justify-end gap-2">
            <p className="me-1">
              {localStorage.getItem("username")}
              <span className="text-black ms-2">
                (
                {localStorage.getItem("firstname") +
                  " " +
                  localStorage.getItem("lastname")}
                )
              </span>{" "}
            </p>
            <p
              className="text-xl text-green-500 pe-5"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3.1fr 1fr" }}>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 h-[60px] mb-5">
            <p>
              <HorseIcon
                style={{
                  fill: location.pathname === "/horse" ? "#37b34a" : "#717171",
                  width: "40px",
                  height: "40px",
                }}
              />
            </p>

            <p>
              <WorldCupIcon
                style={{
                  fill: location.pathname === "/cup" ? "#37b34a" : "#717171",
                  width: "40px",
                  height: "40px",
                }}
              />
            </p>

            <p>
              <DogIcon
                style={{
                  fill: location.pathname === "/horse" ? "#37b34a" : "#717171",
                  width: "50px",
                  height: "50px",
                }}
              />
            </p>

            <p>
              <MotorIcon
                style={{
                  fill: location.pathname === "/horse" ? "#37b34a" : "#717171",
                  width: "60px",
                  height: "60px",
                }}
              />
            </p>

            <Link to="/spin">
              <SpinIcon
                style={{
                  fill: location.pathname === "/spin" ? "#37b34a" : "#717171",
                  width: "34px",
                  height: "34px",
                  marginTop: "-5px",
                }}
              />
            </Link>

            <Link to="/">
              {location.pathname === "/" ? (
                <KenoIconActive
                  style={{ width: "34px", height: "34px", marginTop: "-5px" }}
                />
              ) : (
                <KenoIconNotActive
                  style={{ width: "34px", height: "34px", marginTop: "-5px" }}
                />
              )}
            </Link>
          </div>
          <Outlet />
        </div>

        <div className="flex flex-col items-center w-full gap-2 pb-3 shadow-lg h-fit shadow-gray-200">
          <p className="text-green-500 w-full shadow-md shadow-gray-200 flex justify-center py-3 text-[1.2rem]">
            Betslip
          </p>
          <div className="flex justify-center w-full">
            <div className="rounded-md flex p-0.5 bg-addToSlip">
              <button className="px-5 text-white bg-transparent rounded-l-md">
                SINGLE
              </button>
              <button className="px-5 text-gray-600 bg-white rounded-r-md">
                MULTIPLES
              </button>
            </div>
          </div>
          {betSuccess && (
            <div className="rounded-md flex p-0.5 bg-addToSlip text-white px-20">
              Bet placed Successfully
            </div>
          )}

          {betInvalid && (
            <div
              className="rounded-md flex p-0.5 text-white px-20"
              style={{
                backgroundColor: "#ff0000",
              }}
            >
              Your Bets are not valid, please clear the slip and try again
            </div>
          )}

          {slips.length > 0 ? (
            <>
              <div
                style={{ maxHeight: "300px", overflowY: "auto", width: "100%" }}
                className="px-2 mt-3"
                ref={slipsContainerRef}
              >
                {slips.map((slip) => {
                  return (
                    <div
                      className="w-full flex flex-col text-[0.7rem] bg-slipGray p-0.5 rounded-md text-white mb-3"
                      key={slip.date}
                    >
                      <div className="flex items-start w-full gap-2">
                        {slip.gameType === "Keno" ? (
                          <KenoIconSlip
                            style={{ width: "25px", height: "25px" }}
                          />
                        ) : (
                          <SpinIcon
                            style={{
                              fill: "#f1eeee",
                              width: "25px",
                              height: "25px",
                            }}
                          />
                        )}
                        <div className="flex text-[13px] flex-col w-2/3 font-bold">
                          <p>{slip.game}</p>

                          <div className="flex items-center gap-1">
                            <p>{slip.value}</p>
                            <span className="px-[3px] rounded-sm bg-oddGreenBg flex justify-center items-center h-[15px]">
                              {slip.odd}
                            </span>
                          </div>

                          <p className="f">
                            {slip.date + " "}
                            <span className="text-white">
                              ID: {slip.gameId}
                            </span>
                          </p>
                          <div className="flex items-center h-[23px]">
                            <div
                              onClick={() => {
                                handleClickForPlusMinus({
                                  date: slip.date,
                                  value: 10,
                                });
                              }}
                              className="bg-plusMinusGray cursor-pointer rounded-l-sm h-full w-[30px] relative"
                            >
                              <div className="absolute w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-3/4"></div>
                              <div className="absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
                            </div>

                            <input
                              value={slip.amount}
                              data-date={slip.date}
                              onInput={handleInput}
                              type="number"
                              className="w-full h-full px-2 text-gray-600 border-0 outline-0"
                            />

                            <div
                              onClick={() => {
                                handleClickForPlusMinus({
                                  date: slip.date,
                                  value: -10,
                                });
                              }}
                              className=" cursor-pointer bg-plusMinusGray rounded-r-sm h-full w-[30px] relative"
                            >
                              <div className="absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            dispatch(removeGame(slip.date));
                          }}
                          className="cursor-pointer bg-transparent h-[20px] w-[20px] relative left-[15%]"
                        >
                          <div className="absolute w-1/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-3/4"></div>
                          <div className="absolute w-3/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-1/4"></div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-1 pr-11">
                        To Win:
                        <p className="font-bold ">
                          {" "}
                          Br {slip.amount * slip.odd}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center h-[23px]">
                <div
                  onClick={() => {
                    handleClickForPlusMinus({
                      date: stakeValue,
                      value: 10,
                    });
                  }}
                  className="bg-plusMinusGray cursor-pointer rounded-l-sm h-full w-[30px] relative"
                >
                  <div className="absolute w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-3/4"></div>
                  <div className="absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
                </div>

                <input
                  type="number"
                  className="w-full h-full px-2 text-gray-600 border-0 outline-0"
                  placeholder="Custom"
                  onChange={(e) => {
                    setStakeValue(parseInt(e.target.value, 10));
                  }}
                  value={stakeValue}
                />

                <div
                  onClick={() => {
                    handleClickForPlusMinus({
                      date: stakeValue,
                      value: -10,
                    });
                  }}
                  className=" cursor-pointer bg-plusMinusGray rounded-r-sm h-full w-[30px] relative"
                >
                  <div className="absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 h-1/4"></div>
                </div>

                <button
                  className="px-3 py-1 ml-3 text-white rounded bg-blueFull hover:bg-blue-700"
                  onClick={() => {
                    dispatch(IncreaseValue(stakeValue));
                  }}
                >
                  Add
                </button>
              </div>

              <div className="flex w-full gap-2">
                {[
                  { color: "red", num: 10 },
                  { color: "pink", num: 20 },
                  { color: "purple", num: 50 },
                  { color: "blue", num: 100 },
                  { color: "green", num: 150 },
                ].map((data) => {
                  return (
                    <>
                      <div
                        key={data.num}
                        className={clsx(
                          `w-[60px] -space-y-2 px-1 cursor-pointer flex flex-col justify-center text-white h-[40px] items-center rounded-[3px] mt-2 ml-1`,
                          { "bg-brown": data.num === 10 },
                          { "bg-pinkFull": data.num === 20 },
                          { "bg-purpleFull": data.num === 50 },
                          { "bg-blueFull": data.num === 100 },
                          { "bg-greenFull": data.num === 150 }
                        )}
                        onClick={() => {
                          dispatch(IncreaseValue(data.num));
                        }}
                      >
                        <p className="self-start text-[13px]">Br</p>
                        <p className="self-center text-[20px]">{data.num}</p>
                      </div>
                    </>
                  );
                })}
              </div>

              <div className="flex flex-col w-full text-gray-500">
                <div className="text-[17px] w-full font-medium flex justify-between px-3">
                  <p>TOTAL STAKE</p>
                  <p>Br {totalAmountCalculater(slips)}</p>
                </div>

                <div className="text-[20px] w-full font-semibold flex justify-between px-3">
                  <p>TOTAL "TO WIN"</p>
                  <p>Br {totalWinCalculater(slips)}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Add more bets</p>
          )}

          <div
            className={clsx("flex text-[1rem] w-full text-white items-center")}
          >
            <button
              onClick={() => {
                dispatch(removeGames());
              }}
              className={clsx("px-3 py-3 bg-pink", {
                "bg-opacity-30": slips.length === 0,
              })}
              disabled={slips.length === 0}
            >
              CLEAR
            </button>
            <button
              className={clsx(
                "px-4 py-3 bg-addToSlip border-white border-[1.4px] flex-grow shadow-gray-400 shadow-md rounded-[3px]",
                { "bg-opacity-30": slips.length === 0 }
              )}
              disabled={slips.length === 0 || isPlaceBetDisabled}
              onClick={handlePlaceBet}
              style={{ backgroundColor: isPlaceBetDisabled ? "#ccc" : "" }}
            >
              PLACE BET BR {totalAmountCalculater(slips)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
