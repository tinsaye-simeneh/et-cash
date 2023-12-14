import React, { useRef, useState } from "react";
import Number from "./number";
import { useSelector, useDispatch } from "react-redux";
import { addGame } from "../../../stores/betslip/betslipSlice";
import clsx from "clsx";

const Zero = (props) => {
  const dispatch = useDispatch();
  const [hoveredNum, setHoveredNum] = useState(null);
  const [hoveredCircle, setHoveredCircle] = useState(null);

  const gridState = useSelector((state) => {
    const win = [];
    const cornerSplit = [];

    state.betslip.value.forEach((game) => {
      if (game.game === "Win") {
        win.push(parseInt(game.value, 10));
      } else if (game.game === "Corner" || game.game === "Split") {
        cornerSplit.push(game.id);
      }
    });

    return { win, cornerSplit };
  });

  const containerRef = useRef(null);

  const handleHover = (num) => {
    console.log(containerRef.current);
    setHoveredNum(num);
    const circles = containerRef.current.querySelectorAll(".circle");
    circles.forEach((circle) => {
      circle.style.display = "block";
    });
  };

  const handleLeave = (num) => {
    setHoveredNum();
    const circles = containerRef.current.querySelectorAll(".circle");
    circles.forEach((circle) => {
      if (!gridState.cornerSplit.includes(circle.dataset.idx)) {
        circle.style.display = "none";
      }
    });
  };

  const circleStyle = {
    position: "absolute",
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    display: "none",
    cursor: "pointer",
  };

  const handleCircle = (s, num) => {
    setHoveredCircle(s);
  };
  const handleLeaveCircle = (num) => {
    setHoveredCircle();
  };

  const handleClickCircle = (s, num) => {
    if (s === 6) {
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "corner",
          date: new Date().toLocaleString(),
          value: "Yes",
          gameId: props.gameId,
          odd: Math.floor(36 / 4),
          amount: 10,
          id: `${s}-${num}`,
        })
      );
    } else {
      const selectedNumbers = [0, num];
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "split",
          date: new Date().toLocaleString(),
          value: selectedNumbers.join("/"),
          gameId: props.gameId,
          odd: Math.floor(36 / selectedNumbers.length),
          amount: 10,
          id: `${s}-${num}`,
        })
      );
    }
  };

  const handleNumClick = (num) => {
    dispatch(
      addGame({
        gameUuid: localStorage.getItem("spinId"),
        game: "win",
        date: new Date().toLocaleString(),
        value: num.toString(),
        gameId: props.gameId,
        odd: Math.floor(36),
        amount: 10,
      })
    );
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: "54px",
          height: "100%",
          border: "1px solid white",
          position: "relative",
        }}
        onClick={() => {
          handleNumClick(0);
        }}
        onMouseEnter={() => handleHover()} // Pass the current number to handleHover
        onMouseLeave={() => handleLeave()} // Pass the current number to handleLeave
      >
        <div
          className={clsx(
            "-translate-x-3/4 -translate-y-12 shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
            { hidden: !gridState.win.includes(0) },
            { block: gridState.win.includes(0) }
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

        <Number color="#008000" width={51} height={157} num={0} />
        <div
          data-idx={`${4}-${2}`}
          onMouseEnter={() => handleCircle(1, 2)} // Pass the current number to handleHover
          onMouseLeave={() => handleLeaveCircle(1)}
          onClick={(e) => {
            e.stopPropagation();
            handleClickCircle(4, 2);
          }}
          className="z-20 circle rightmid"
          style={{
            top: "50.7%",
            right: "-9.6px",
            transform: "translateY(-50%)",
            backgroundColor:
              hoveredCircle === 1 || gridState.cornerSplit.includes(`${4}-${2}`)
                ? "#008000"
                : "white",
            ...circleStyle,
            display: gridState.cornerSplit.includes(`${4}-${2}`)
              ? "block"
              : "none",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
            borderWidth: gridState.cornerSplit.includes(`${4}-${2}`)
              ? "2px"
              : "0",
            borderStyle: "dashed",
            borderColor: "#ffffff",
          }}
        ></div>

        <div
          data-idx={`${4}-${3}`}
          onMouseEnter={() => handleCircle(2, 2)} // Pass the current number to handleHover
          onMouseLeave={() => handleLeaveCircle(2)}
          onClick={(e) => {
            e.stopPropagation();
            handleClickCircle(4, 3);
          }}
          className="z-20 circle rightup"
          style={{
            top: "19px",
            right: "-9.6px",
            backgroundColor:
              hoveredCircle === 2 || gridState.cornerSplit.includes(`${4}-${3}`)
                ? "#008000"
                : "white",
            ...circleStyle,
            display: gridState.cornerSplit.includes(`${4}-${3}`)
              ? "block"
              : "none",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
            borderWidth: gridState.cornerSplit.includes(`${4}-${3}`)
              ? "2px"
              : "0",
            borderStyle: "dashed",
            borderColor: "#ffffff",
          }}
        ></div>

        <div
          data-idx={`${4}-${1}`}
          onMouseEnter={() => handleCircle(3, 1)}
          onMouseLeave={() => handleLeaveCircle(1)}
          onClick={(e) => {
            e.stopPropagation();
            handleClickCircle(4, 1);
          }}
          className="z-20 circle rightbottom"
          style={{
            bottom: "16px",
            right: "-9.7px",
            backgroundColor:
              hoveredCircle === 3 || gridState.cornerSplit.includes(`${4}-${1}`)
                ? "#008000"
                : "white",
            ...circleStyle,
            display: gridState.cornerSplit.includes(`${4}-${1}`)
              ? "block"
              : "none",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
            borderWidth: gridState.cornerSplit.includes(`${4}-${1}`)
              ? "2px"
              : "0",
            borderStyle: "dashed",
            borderColor: "#ffffff",
          }}
        ></div>

        <div
          data-idx={`${6}-${1}`}
          onMouseEnter={() => handleCircle(4, 1)}
          onMouseLeave={() => handleLeaveCircle(1)}
          onClick={(e) => {
            e.stopPropagation();
            handleClickCircle(6, 1);
          }}
          className="z-20 circle rightbottom"
          style={{
            bottom: "-10px",
            right: "-9.7px",
            backgroundColor:
              hoveredCircle === 4 || gridState.cornerSplit.includes(`${6}-${1}`)
                ? "#008000"
                : "white",
            ...circleStyle,
            display: gridState.cornerSplit.includes(`${6}-${1}`)
              ? "block"
              : "none",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
            borderWidth: gridState.cornerSplit.includes(`${6}-${1}`)
              ? "2px"
              : "0",
            borderStyle: "dashed",
            borderColor: "#ffffff",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Zero;
