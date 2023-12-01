import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../../stores/betslip/betslipSlice";
import clsx from "clsx";

const Colors = (props) => {
  const Style = {
    width: "140px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
  };

  const dispatch = useDispatch();

  const colorState = useSelector((state) => {
    const tempArray = [];

    state.betslip.value.forEach((game) => {
      if (game.game === "Sector (Colour)") {
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
        gameId: props.gameId,
        gameType: "SpinAndWin",
        odd: 6,
        amount: 10,
      })
    );
  };

  function sendColor(num) {
    props.whichColors(num);
  }

  function removeColor() {
    props.whichColors("0");
  }

  return (
    <div className="flex">
      <div
        onMouseEnter={() => sendColor("orange")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "32/15/19/4/21/2")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#ff8f17",
          color: "white",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("32/15/19/4/21/2") },
            { block: colorState.includes("32/15/19/4/21/2") }
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
        <div style={Style}>32/15/19/4/21/2</div>
      </div>
      <div
        onMouseEnter={() => sendColor("blue")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "25/17/34/6/27/13")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#163fff",
          color: "white",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("25/17/34/6/27/13") },
            { block: colorState.includes("25/17/34/6/27/13") }
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
        <div style={Style}>25/17/34/6/27/13</div>
      </div>
      <div
        onMouseEnter={() => sendColor("violate")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "36/11/30/8/23/10")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#ff5aff",
          color: "white",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("36/11/30/8/23/10") },
            { block: colorState.includes("36/11/30/8/23/10") }
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
        <div style={Style}>36/11/30/8/23/10</div>
      </div>
      <div
        onMouseEnter={() => sendColor("sky")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "5/24/16/33/1/20")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#00cf9e",
          color: "white",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("5/24/16/33/1/20") },
            { block: colorState.includes("5/24/16/33/1/20") }
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
        <div style={Style}>5/24/16/33/1/20</div>
      </div>
      <div
        onMouseEnter={() => sendColor("yellow")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "14/31/9/22/18/9")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#fff300",
          color: "#808c9c",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("14/31/9/22/18/9") },
            { block: colorState.includes("14/31/9/22/18/9") }
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

        <div style={Style}>14/31/9/22/18/9</div>
      </div>
      <div
        onMouseEnter={() => sendColor("white")}
        onMouseLeave={() => removeColor()}
        onClick={() => handleClick("Sector (Colour)", "7/28/12/35/3/26")}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "140px",
          border: "1px solid #496649",
          backgroundColor: "#ffffff",
          color: "#808c9c",
        }}
      >
        <div
          className={clsx(
            "shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !colorState.includes("7/28/12/35/3/26") },
            { block: colorState.includes("7/28/12/35/3/26") }
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
        <div style={Style}>7/28/12/35/3/26</div>
      </div>
    </div>
  );
};

export default Colors;
