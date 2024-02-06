import React, { useState } from "react";
import Number from "./number";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../../stores/betslip/betslipSlice";
import clsx from "clsx";

const Division = (props) => {
  const dispatch = useDispatch();

  const divisionState = useSelector((state) => {
    const tempArray = [];

    state.betslip.value.forEach((game) => {
      if (game.game === "dozens") {
        tempArray.push(game.value);
      }
    });

    return tempArray;
  });

  function formatOrdinal(divNum) {
    if (divNum >= 1 && divNum <= 3) {
      const suffix = divNum === 1 ? "st" : divNum === 2 ? "nd" : "rd";
      return `${divNum}${suffix}_dozen`;
    } else {
      return `${divNum}nd_dozen`;
    }
  }

  const handleClick = (divNum) => {
    const formattedOrdinal = formatOrdinal(divNum);
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: "dozens",
        date: new Date().toLocaleString(),
        value: `${formattedOrdinal}`,
        gameId: props.gameId,
        gameType: "SpinAndWin",
        odd: 3,
        amount: 10,
      })
    );
  };

  function sendNum(num) {
    props.firstChanger(num);
  }

  function removeNum() {
    props.firstChanger(0);
  }

  return (
    <div className="flex">
      {[...Array(3).keys()].map((element) => {
        return (
          <div
            className={clsx("relative", {
              "bg-quickPick": divisionState.includes(
                `${formatOrdinal(element + 1)}`
              ),
            })}
            onMouseEnter={() => sendNum(element + 1)}
            onMouseLeave={() => removeNum()}
            onClick={() => {
              handleClick(element + 1);
            }}
            style={{ width: "280px", border: "1px solid #496649" }}
          >
            <div
              className={clsx(
                "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
                {
                  hidden: !divisionState.includes(
                    `${formatOrdinal(element + 1)}`
                  ),
                },
                {
                  block: divisionState.includes(
                    `${formatOrdinal(element + 1)}`
                  ),
                }
              )}
              style={{
                position: "absolute",
                zIndex: "20",
                left: "30%",
                top: "50%",
                width: "17px",
                height: "17px",
                borderRadius: "50%",
              }}
            ></div>
            <Number
              color="transparent"
              width={278}
              height={50}
              num={`${formatOrdinal(element + 1)}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Division;
