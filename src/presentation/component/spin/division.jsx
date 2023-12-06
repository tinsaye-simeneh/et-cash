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
      if (game.game === "Dozens") {
        tempArray.push(game.value);
      }
    });

    return tempArray;
  });

  const handleClick = (divNum) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: "Dozens",
        date: new Date().toLocaleString(),
        value: `${divNum}nd 12`,
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
              "bg-quickPick": divisionState.includes(`${element + 1}nd 12`),
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
                { hidden: !divisionState.includes(`${element + 1}nd 12`) },
                { block: divisionState.includes(`${element + 1}nd 12`) }
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
              num={`${element + 1}st 12`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Division;
