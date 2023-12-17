import React, { useState } from "react";
import Number from "./number";
import clsx from "clsx";
import { addGame } from "../../../stores/betslip/betslipSlice";
import { useDispatch, useSelector } from "react-redux";

const Slider = (props) => {
  const [nums, setNums] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ]);

  const [hoveredNum, setHoveredNum] = useState(37);

  const dispatch = useDispatch();
  const neighBorsState = useSelector((state) => {
    const numbers = [];
    state.betslip.value.forEach((game) => {
      if (game.game === "Neighbors") {
        numbers.push(game.value.split("/").map((str) => parseInt(str, 10))[2]);
      }
    });
    return numbers;
  });

  const neighBors = {
    37: [],
    0: [3, 26, 0, 32, 15],
    32: [26, 0, 32, 15, 19],
    15: [0, 32, 15, 19, 4],
    19: [32, 15, 19, 4, 21],
    4: [15, 19, 4, 21, 2],
    21: [19, 4, 21, 2, 25],
    2: [4, 21, 2, 25, 17],
    25: [21, 2, 25, 17, 34],
    17: [2, 25, 17, 34, 6],
    34: [25, 17, 34, 6, 27],
    6: [17, 34, 6, 27, 13],
    27: [34, 6, 27, 13, 36],
    13: [6, 27, 13, 36, 11],
    36: [27, 13, 36, 11, 30],
    11: [13, 36, 11, 30, 8],
    30: [36, 11, 30, 8, 23],
    8: [11, 30, 8, 23, 10],
    23: [30, 8, 23, 10, 5],
    10: [8, 23, 10, 5, 24],
    5: [23, 10, 5, 24, 16],
    24: [10, 5, 24, 16, 33],
    16: [5, 24, 16, 33, 1],
    33: [24, 16, 33, 1, 20],
    1: [16, 33, 1, 20, 14],
    20: [33, 1, 20, 14, 31],
    14: [1, 20, 14, 31, 9],
    31: [20, 14, 31, 9, 22],
    9: [14, 31, 9, 22, 18],
    22: [31, 9, 22, 18, 29],
    18: [9, 22, 18, 29, 7],
    29: [22, 18, 29, 7, 28],
    7: [18, 29, 7, 28, 12],
    28: [29, 7, 28, 12, 35],
    12: [7, 28, 12, 35, 3],
    35: [28, 12, 35, 3, 26],
    3: [12, 35, 3, 26, 0],
    26: [35, 3, 26, 0, 32],
  };

  const handleClick = (num) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: "neighbors",
        date: new Date().toLocaleString(),
        value: neighBors[num].join("/"),
        gameId: props.gameId,
        gameType: "SpinAndWin",
        odd: 7,
        amount: 10,
      })
    );
  };

  const getColor = (num) => {
    const specialNums = [
      3, 9, 12, 18, 21, 30, 36, 5, 14, 23, 32, 1, 7, 16, 19, 25, 30, 32, 34, 36,
    ];
    if (num === 0) {
      return "#008000";
    } else if (specialNums.includes(num)) {
      return "#ff0000";
    } else {
      return "#000000";
    }
  };

  const slide = (direction) => {
    if (direction === "next") {
      setNums([...nums.slice(1), nums[0]]);
    } else if (direction === "prev") {
      setNums([nums[nums.length - 1], ...nums.slice(0, -1)]);
    }
  };

  return (
    <div className="flex items-center">
      <div
        onClick={() => {
          slide("prev");
        }}
        className="cursor-pointer bg-gradient-to-r from-green-900 to-transparent rounded-l-sm h-[55px] w-[100px] relative left-7"
      >
        <div className="absolute left-2 top-1/2 -translate-y-1/4 -rotate-45 bg-white w-[4px] h-[15px]"></div>
        <div className="absolute left-2 top-[20px] -translate-y-1/4 bg-white rotate-45 w-[4px] h-[15px]"></div>
      </div>

      <div className="overflow-hidden bg-gray-200 slider-container w-200">
        <div className="flex transition-transform duration-300">
          {nums.map((num) => (
            <div
              onMouseEnter={() => {
                setHoveredNum(num);
              }}
              onMouseLeave={() => {
                setHoveredNum(37);
              }}
              onClick={() => {
                handleClick(num);
              }}
              className={clsx(
                "relative cursor-pointer",
                {
                  "before:content-[''] before:absolute before:inset-0 before:z-10 before:bg-gridNumbsHover":
                    neighBors[hoveredNum].includes(num),
                },
                { "": !neighBors[num].includes(num) }
              )}
              key={num}
              style={{ border: "1px solid white" }}
            >
              <div
                className={clsx(
                  "-translate-x-1/2 -translate-y-1/5 shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
                  { hidden: !neighBorsState.includes(num) },
                  { block: neighBorsState.includes(num) }
                )}
                style={{
                  position: "absolute",
                  zIndex: "20",
                  left: "50%",
                  top: "50%",
                  width: "17px",
                  height: "17px",
                  borderRadius: "50%",
                }}
              ></div>

              <Number width={47} height={52} num={num} color={getColor(num)} />
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={() => {
          slide("next");
        }}
        className="cursor-pointer bg-gradient-to-l from-green-900 to-transparent rounded-l-sm h-[55px] w-[100px] relative right-6"
      >
        <div className="absolute right-1 top-1/2 -translate-y-1/4 rotate-45 bg-white w-[4px] h-[15px]"></div>
        <div className="absolute right-1 top-[20px] -translate-y-1/4 bg-white -rotate-45 w-[4px] h-[15px]"></div>
      </div>
    </div>
  );
};

export default Slider;
