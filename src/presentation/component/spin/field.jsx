import React, { useState } from "react";
import Zero from "./zero";
import RightNum from "./rightNum";
import GridNums from "./gridNums";
import Division from "./division";
import BlackRed from "./blackRed";
import Colors from "./colors";
import Slider from "./slider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpinnData } from "../../../stores/spinn/spinnAction";

const Field = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [time, setTime] = useState(0);
  const [firstOr, setFirstOr] = useState(null);
  const [right, setRight] = useState(null);
  const [numDiv, setNumDiv] = useState(null);
  const [divColor, setColor] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [hideRefresh, setHideRefresh] = useState(true);

  useEffect(() => {
    dispatch(getSpinnData()).then((res) => {
      setData(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const endTime = new Date(data?.endTime).getTime();
      const currentTime = new Date().getTime();
      setTime(Math.floor((endTime - currentTime) / 1000));
      localStorage.setItem("spinId", data?._id);
      localStorage.setItem("spinTime", data?.endTime);
      localStorage.setItem("spingameId", data?.gameId);
      setGameId(data?.gameId);

      const timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else if (time === 0) {
          dispatch(getSpinnData()).then((res) => {
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
    }
  }, [data, time, dispatch]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  function firstChanger(state) {
    setFirstOr(state);
  }

  function rightSetter(number) {
    setRight(number);
  }

  function numDivSetter(num) {
    setNumDiv(num);
  }

  function colorChange(co) {
    setColor(co);
  }

  return (
    <div className="flex flex-col gap-1 px-1 top-[140px]">
      <div className="flex rounded-[4px] overflow-hidden w-fit">
        <button className="px-3 py-1 text-white bg-redNextDraw">
          NEXT DRAW {formatTime() ? formatTime() : "00:00"}
        </button>
        <button className="flex items-center gap-2 px-3 py-1 text-white bg-redeem">
          REPEAT
          <select className="text-black rounded-md">
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
      {!disabled ? (
        <div
          style={{
            backgroundColor: "#1b401b",
            width: "1060px",
            height: "520px",
          }}
        >
          <div
            className="flex items-center pt-6"
            style={{ margin: "40px", marginTop: "5px" }}
          >
            <Zero gameId={gameId} />
            <GridNums
              division={firstOr}
              right={right}
              whichHalf={numDiv}
              divColor={divColor}
              gameId={gameId}
            />
            <RightNum rightFirst={rightSetter} gameId={gameId} />
          </div>

          <div className="px-24 -mt-6">
            <div>
              <Division firstChanger={firstChanger} gameId={gameId} />
            </div>
            <div className="mt-4">
              <BlackRed whichDiv={numDivSetter} gameId={gameId} />
            </div>
            <div className="mt-4">
              <Colors whichColors={colorChange} gameId={gameId} />
            </div>
          </div>
          <h2 className="px-3 mt-8 text-white -mb-14 text-md">NEIGHBORS</h2>
          <div className="mt-16">
            <Slider gameId={gameId} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-2 mt-10">
            <div className="flex flex-col items-center justify-center w-full h-full gap-2 mt-10">
              The game is finished please wait for the next game or refresh the
              page to start the new game
            </div>
            {!hideRefresh && (
              <>
                <button
                  className="px-3 py-2 text-white rounded-md bg-cashierOption"
                  onClick={() => {
                    setDisabled(false);
                    dispatch(getSpinnData()).then((res) => {
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
      )}
    </div>
  );
};

export default Field;
