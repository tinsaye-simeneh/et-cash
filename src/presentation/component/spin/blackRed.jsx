import React, { useState } from "react";
import Number from "./number";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../../stores/betslip/betslipSlice";
import clsx from "clsx";

const BlackRed = (props) => {
  const dispatch = useDispatch();

  const blackRedState = useSelector((state) => {
    const tempArray = [];

    state.betslip.value.forEach((game) => {
      if (
        game.value === "Even" ||
        game.value === "Odd" ||
        game.value === "1-18" ||
        game.value === "Black" ||
        game.value === "19-36" ||
        game.value === "Red"
      ) {
        tempArray.push(game.value);
      }
    });

    return tempArray;
  });

  const handleClick = (game, value) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: game,
        date: new Date().toLocaleString(),
        value: value,
        gameType: "SpinAndWin",
        gameId: props.gameId,
        odd: 2,
        amount: 10,
      })
    );
  };

  function sendNum(num) {
    props.whichDiv(num);
  }

  function removeNum() {
    props.whichDiv(0);
  }

  return (
    <div className="flex">
      <div
        className={clsx("relative", {
          "bg-quickPick": blackRedState.includes("1-18"),
        })}
        onMouseEnter={() => sendNum(1)}
        onMouseLeave={() => removeNum()}
        onClick={() => {
          handleClick("high/low", "high");
        }}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("1-18") },
            { block: blackRedState.includes("1-18") }
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
        <Number color="transparent" width={140} height={50} num={"1 - 18"} />
      </div>
      <div
        className={clsx("relative", {
          "bg-quickPick": blackRedState.includes("Even"),
        })}
        onClick={() => {
          handleClick("odd/even", "even");
        }}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("Even") },
            { block: blackRedState.includes("Even") }
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
        <Number color="transparent" width={140} height={50} num={"Even"} />
      </div>
      <div
        onClick={() => {
          handleClick("color", "red");
        }}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("Red") },
            { block: blackRedState.includes("Red") }
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
        <Number color="#ff0000" width={140} height={50} num={"Red"} />
      </div>
      <div
        onClick={() => {
          handleClick("color", "black");
        }}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("Black") },
            { block: blackRedState.includes("Black") }
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
        <Number color="#000000" width={140} height={50} num={"Black"} />
      </div>
      <div
        className={clsx("relative", {
          "bg-quickPick": blackRedState.includes("Odd"),
        })}
        onClick={() => {
          handleClick("odd/even", "odd");
        }}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("Odd") },
            { block: blackRedState.includes("Odd") }
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
        <Number color="transparent" width={140} height={50} num={"Odd"} />
      </div>
      <div
        className={clsx("relative", {
          "bg-quickPick": blackRedState.includes("19-36"),
        })}
        onClick={() => {
          handleClick("high/low", "low");
        }}
        onMouseEnter={() => sendNum(2)}
        onMouseLeave={() => removeNum()}
        style={{
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !blackRedState.includes("19-36") },
            { block: blackRedState.includes("19-36") }
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
        <Number color="transparent" width={130} height={50} num={"19 - 36"} />
      </div>
    </div>
  );
};

export default BlackRed;