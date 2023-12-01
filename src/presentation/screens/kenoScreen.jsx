import NumberGrid from "../component/kano/numberGrid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";

import { addGame } from "../../stores/betslip/betslipSlice";
import { removeNumber, quickPick } from "../../stores/keno/kenoSlice";
import clsx from "clsx";
import { getKenoData } from "../../stores/keno/kenoAction";

const KenoScreen = function () {
  const numbers = useSelector((state) => state.keno.value);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [gameId, setGameId] = useState(null);

  const [data, setData] = useState(null);
  const [time, setTime] = useState(0);
  const [hideRefresh, setHideRefresh] = useState(true);

  useEffect(() => {
    dispatch(getKenoData()).then((res) => {
      setData(res.payload);
    });
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  }, [dispatch]);

  useEffect(() => {
    const endTime = new Date(data?.endTime).getTime();
    const currentTime = new Date().getTime();
    setTime(Math.floor((endTime - currentTime) / 1000));

    localStorage.setItem("kenoId", data?._id);
    localStorage.setItem("KenoTime", data?.endTime);
    localStorage.setItem("KenogameId", data?.gameId);
    setGameId(data?.gameId);

    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else if (time === 0) {
        dispatch(getKenoData()).then((res) => {
          setData(res.payload);
        });
      }
      if (time <= 6) {
        setDisabled(true);
      }
      if (time <= 1) {
        setHideRefresh(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [data, time, dispatch]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const [quickPickValue, setSelectedValue] = useState("");

  const handleQuickPickChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  function generateRandomIntegers() {
    const k = parseInt(quickPickValue, 10);

    const randomIntegers = [];

    for (let i = 0; i < k; i++) {
      const randomInteger = Math.floor(Math.random() * 80) + 1;
      randomIntegers.push(randomInteger);
    }

    dispatch(quickPick(randomIntegers));
  }

  useEffect(generateRandomIntegers, [quickPickValue]);

  const payoutList = {
    10: [
      [0, 1],
      [4, 2],
      [5, 4],
      [6, 12],
      [7, 40],
      [8, 400],
      [9, 2500],
      [10, 5000],
    ],
    9: [
      [0, 1],
      [4, 3],
      [5, 6],
      [6, 18],
      [7, 120],
      [8, 1800],
      [9, 4200],
    ],
    8: [
      [0, 1],
      [4, 4],
      [5, 8],
      [6, 68],
      [7, 600],
      [8, 3000],
    ],
    7: [
      [0, 1],
      [3, 1],
      [4, 6],
      [5, 12],
      [6, 120],
      [7, 2150],
    ],
    6: [
      [3, 1],
      [4, 10],
      [5, 70],
      [6, 1800],
    ],
    5: [
      [2, 1],
      [3, 3],
      [4, 15],
      [5, 300],
    ],
    4: [
      [2, 1],
      [3, 8],
      [4, 100],
    ],
    3: [
      [2, 3],
      [3, 35],
    ],
    2: [[2, 15]],
    1: [[1, 3.8]],
  };

  const addToBetslipHeadTail = (event) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("kenoId"),
        gameType: "Keno",
        game: "headsandtails",
        date: new Date().toLocaleString(),
        value: event.target.dataset.value,
        gameId: gameId,
        odd: 2,
        amount: 10,
      })
    );
  };

  const addToBetslipWin = () => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("kenoId"),
        gameType: "Keno",
        game: "win",
        date: new Date().toLocaleString(),
        value: numbers.toString(),
        gameId: gameId,
        odd: payoutList[numbers.length][
          payoutList[numbers.length].length - 1
        ][1],
        amount: 10,
      })
    );
  };

  return (
    <div className="flex flex-col w-full h-full gap-2 px-7">
      <div className="flex flex-col gap-2 text-[1.2rem]">
        <div className="flex rounded-[4px] overflow-hidden w-fit">
          <button className="px-3 py-1 text-white bg-redNextDraw">
            NEXT DRAW {formatTime() ? formatTime() : "00:00"}
          </button>
          <button className="flex items-center gap-2 px-3 py-1 text-white bg-redeem">
            REPEAT
            <select className="text-black rounded-md cursor-pointer">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </button>
        </div>

        <div className="flex justify-start gap-10 pr-7">
          <button className="rounded-[4px] px-3 py-1 text-white bg-quickPick flex items-center gap-1">
            QUICK PICK
            <select
              className="text-black rounded-sm w-[50px] cursor-pointer"
              onChange={handleQuickPickChange}
              value={quickPickValue}
            >
              <option value="0"> </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            |
            <button
              disabled={quickPickValue === ""}
              onClick={generateRandomIntegers}
              className="border-0 cursor-pointer outline-0"
            >
              <FaShuffle className="fill-white" />
            </button>
          </button>
          <div className="flex justify-center gap-1 grow">
            {[
              { color: "red", odd: 2, heading: "heads" },
              { color: "pink", odd: 4, heading: "evens" },
              { color: "red", odd: 2, heading: "tails" },
            ].map((data) => {
              return (
                <button
                  key={data.color}
                  data-value={data.heading}
                  onClick={addToBetslipHeadTail}
                  className={clsx(
                    `flex gap-4 rounded-[4px] px-2 py-1 text-white grow justify-between`,
                    { "bg-head": data.color === "red" },
                    { "bg-tail": data.heading === "tails" },
                    { "bg-pink": data.heading === "evens" }
                  )}
                >
                  <p className="uppercase">{data.heading}</p>
                  <span className="rounded-[4px] text-black px-3 py-0.5 bg-spanHeadTail font-bold hover:bg-quickPick">
                    {data.odd}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => dispatch(removeNumber())}
            className="px-3 py-1 text-white rounded-[4px] bg-pink flex items-center"
          >
            CLEAR
            <FaTrashCan className="fill-white" />
          </button>
        </div>
      </div>
      <div
        className="w-full gap-3"
        style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
      >
        {disabled ? (
          <div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <div className="flex flex-col items-center justify-center w-full h-full gap-2 mt-10">
                The game is finished please wait for the next game or refresh
                the page to start a new game.
              </div>
              {!hideRefresh && (
                <>
                  {" "}
                  <button
                    className="px-3 py-2 text-white rounded-md bg-cashierOption"
                    onClick={() => {
                      setDisabled(false);
                      dispatch(getKenoData()).then((res) => {
                        setData(res.payload);
                      });
                    }}
                  >
                    Refresh New Game
                  </button>
                  <button
                    className="px-3 py-2 mt-5 text-white rounded-md bg-cashierOption"
                    onClick={() => window.location.reload()}
                  >
                    Reload Page
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <NumberGrid />
        )}
        <div className="flex flex-col items-center gap-2">
          {numbers.length === 0 ? (
            <div className="relative w-full p-4 text-white -z-10 h-fit bg-darkGray">
              <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 -z-10 w-[70px] h-[70px] rotate-45 bg-darkGray"></div>
              Pick 1 to 10 numbers from 80. Pick which numbers you think will be
              randomly selected. The more you pick the more you could win.
            </div>
          ) : (
            <>
              <button
                onClick={addToBetslipWin}
                className="px-3 py-1 text-white text-[1rem] font-semibold rounded-[2px] shadow-gray-500 shadow-sm bg-addToSlip"
              >
                ADD TO BETSLIP
              </button>

              <div className="flex flex-col items-center w-full ">
                <div className="px-3 py-1 text-[1rem] font-semibold w-full flex justify-center text-white rounded-[2px] bg-cashierOption">
                  HIGHEST PAYOUT&nbsp;
                  <span>
                    {payoutList[numbers.length][
                      payoutList[numbers.length].length - 1
                    ][1].toString() +
                      " FROM " +
                      numbers.length}
                  </span>
                </div>

                <div className=" bg-gray  flex flex-col items-center w-5/6 gap-[1px]">
                  {payoutList[numbers.length].map((odd) => {
                    return (
                      <div
                        key={odd[0]}
                        className="grid w-full grid-cols-2 text-gray-400 place-items-center bg-oddBg"
                      >
                        <span>{odd[0]}</span>
                        <span>{odd[1]}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-around w-5/6 font-medium text-gray-500">
                  <span>Hits</span>
                  <span>Pays</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KenoScreen;
