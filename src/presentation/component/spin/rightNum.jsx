import React, { useState } from "react";
import Number from "./number";
import { addGame } from "../../../stores/betslip/betslipSlice";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const RightNum = (props) => {
  const rightState = useSelector((state) => {
    const tempArray = [];

    state.betslip.value.forEach((game) => {
      if (game.game === "Column") {
        tempArray.push(game.value);
      }
    });

    return tempArray;
  });

  const dispatch = useDispatch();

  const handleClick = (right) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: "column",
        date: new Date().toLocaleString(),
        value: `Col${right}`,
        gameId: props.gameId,
        gameType: "SpinAndWin",
        odd: 3,
        amount: 10,
      })
    );
  };

  function sendNum(num) {
    props.rightFirst(num);
  }

  function removeNum() {
    props.rightFirst(0);
  }
  return (
    <div>
      {[...Array(3).keys()].map((num) => {
        return (
          <div
            className={clsx(
              "relative",
              { "bg-redeem": rightState.includes(`Col${num + 1}`) },
              { "bg-quickPick": !rightState.includes(`Col${num + 1}`) }
            )}
            onMouseEnter={() => sendNum(num + 1)}
            onMouseLeave={() => removeNum()}
            onClick={() => {
              handleClick(num + 1);
            }}
            style={{ width: "83px", border: "1px solid #496649" }}
          >
            <div
              className={clsx(
                "-translate-x-3/4 -translate-y-1/4 shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
                { hidden: !rightState.includes(`Col${num + 1}`) },
                { block: rightState.includes(`Col${num + 1}`) }
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

            <Number color="#1b401b" width={81} height={51} num={"2 to 1"} />
          </div>
        );
      })}
    </div>
  );
};

export default RightNum;
