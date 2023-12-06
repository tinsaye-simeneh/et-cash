import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addGame } from "../../../stores/betslip/betslipSlice";
import Number from "./number";
import "./try.css";
import clsx from "clsx";

const GridNums = (props) => {
  const dispatch = useDispatch();

  const division = props.division;
  const right = props.right;
  const gridDiv = props.whichHalf;
  const divColor = props.divColor;

  const nums = Array.from({ length: 36 }, (_, index) => index + 1);
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

  const [circleMark, setCircleMark] = useState([]);

  const exceptions = {
    top: [3, 9, 6, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    bottom: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    left: [2, 3],
    right: [34, 35, 36],
    specialLeft: [1],
  };

  const containerRef = useRef(null);

  const handleHover = (num) => {
    setHoveredNum(num);
    const circles = containerRef.current
      .querySelector(`.containerRef${num}`)
      .querySelectorAll(".circle");
    circles.forEach((circle) => {
      circle.style.display = "block";
    });
  };

  const handleLeave = (num) => {
    setHoveredNum();
    const circles = containerRef.current
      .querySelector(`.containerRef${num}`)
      .querySelectorAll(".circle");
    circles.forEach((circle) => {
      if (!gridState.cornerSplit.includes(circle.dataset.idx)) {
        circle.style.display = "none";
      }
    });
  };

  const specialNums = [
    3, 9, 12, 18, 21, 30, 36, 5, 14, 23, 32, 1, 7, 16, 19, 25, 30, 32, 34, 36,
    27,
  ];

  const getColor = (num) => {
    if (num === 0) {
      return "#008000";
    } else if (specialNums.includes(num)) {
      return "#ff0000";
    } else {
      return "#000000";
    }
  };

  const blackOrWhite = (num) => {
    if (specialNums.includes(num)) {
      return "#95602e";
    } else {
      return "#1b401b"; //
    }
  };

  const containerStyle = {
    width: "840px",
    height: "160px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column-reverse",
  };

  const circleStyle = {
    position: "absolute",
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    display: "none",
  };

  const handleCircle = (s, num) => {
    setHoveredCircle(s);

    const config = {
      1: () =>
        exceptions.top.includes(num)
          ? [num - 1, num - 2, num - 3, num - 4, num - 5]
          : [num + 1, num - 3, num - 2],
      2: () => (exceptions.top.includes(num) ? [num - 1, num - 2] : [num + 1]),
      3: () =>
        exceptions.top.includes(num)
          ? [num - 1, num - 2, num + 1, num + 2, num + 3]
          : [num + 1, num + 3, num + 4],
      4: () => [num - 3],
      5: () => [num + 3],
      6: () =>
        exceptions.bottom.includes(num)
          ? [num - 1, num - 2, num + 1, num + 2, num - 3]
          : [num - 1, num - 3, num - 4],
      7: () =>
        exceptions.bottom.includes(num) ? [num + 1, num + 2] : [num - 1],
      8: () =>
        exceptions.bottom.includes(num)
          ? [num + 5, num + 4, num + 1, num + 2, num + 3]
          : [num - 1, num + 3, num + 2],
    };

    setCircleMark(config[s]());
  };
  const handleClickCircle = (s, num) => {
    const config = {
      1: () =>
        exceptions.top.includes(num)
          ? [num - 1, num - 2, num - 3, num - 4, num - 5]
          : [num + 1, num - 3, num - 2],
      2: () => (exceptions.top.includes(num) ? [num - 1, num - 2] : [num + 1]),
      3: () =>
        exceptions.top.includes(num)
          ? [num - 1, num - 2, num + 1, num + 2, num + 3]
          : [num + 1, num + 3, num + 4],
      4: () => [num - 3],
      5: () => [num + 3],
      6: () =>
        exceptions.bottom.includes(num)
          ? [num - 1, num - 2, num + 1, num + 2, num - 3]
          : [num - 1, num - 3, num - 4],
      7: () =>
        exceptions.bottom.includes(num) ? [num + 1, num + 2] : [num - 1],
      8: () =>
        exceptions.bottom.includes(num)
          ? [num + 5, num + 4, num + 1, num + 2, num + 3]
          : [num - 1, num + 3, num + 2],
    };

    const selectedNumbers = [...config[s](), num];
    selectedNumbers.sort();

    if (s === 6 && num === 1) {
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "corner",
          date: new Date().toLocaleString(),
          gameType: "SpinAndWin",
          value: "Yes",
          gameId: props.gameId,
          odd: Math.floor(36 / selectedNumbers.length),
          amount: 10,
          id: `${s}-${num}`,
        })
      );
    } else if (s === 4 && (num === 2 || num === 3 || num === 1)) {
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "split",
          date: new Date().toLocaleString(),
          value: [0, num].join("/"),
          gameType: "SpinAndWin",
          gameId: props.gameId,
          odd: Math.floor(36 / selectedNumbers.length),
          amount: 10,
          id: `${s}-${num}`,
        })
      );
    } else if ([1, 3, 6, 8].includes(s)) {
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "split",
          date: new Date().toLocaleString(),
          value: selectedNumbers.join("/"),
          gameType: "SpinAndWin",
          gameId: props.gameId,
          odd: Math.floor(36 / selectedNumbers.length),
          amount: 10,
          id: `${s}-${num}`,
        })
      );
    } else {
      dispatch(
        addGame({
          gameUuid: localStorage.getItem("spinId"),
          game: "split",
          date: new Date().toLocaleString(),
          gameType: "SpinAndWin",
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
        gameType: "SpinAndWin",
        odd: Math.floor(36),
        amount: 10,
      })
    );
  };

  useEffect(() => {
    if (division === 1) {
      setCircleMark([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    } else if (division === 2) {
      setCircleMark([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
    } else if (division === 3) {
      setCircleMark([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
    } else if (division === 0) {
      setCircleMark([]);
    }
  }, [division]);

  useEffect(() => {
    if (gridDiv === 1) {
      setCircleMark([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ]);
    } else if (gridDiv === 2) {
      setCircleMark([
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ]);
    } else if (gridDiv === 0) {
      setCircleMark([]);
    }
  }, [gridDiv]);

  useEffect(() => {
    if (divColor === "orange") {
      setCircleMark([32, 15, 19, 4, 21, 2]);
    } else if (divColor === "blue") {
      setCircleMark([25, 17, 34, 6, 27, 13]);
    } else if (divColor === "violate") {
      setCircleMark([36, 11, 30, 8, 23, 10]);
    } else if (divColor === "sky") {
      setCircleMark([5, 24, 16, 33, 1, 20]);
    } else if (divColor === "yellow") {
      setCircleMark([14, 31, 9, 22, 18, 9]);
    } else if (divColor === "white") {
      setCircleMark([7, 28, 12, 35, 3, 26]);
    } else if (divColor === "0") {
      setCircleMark([]);
    }
  }, [divColor]);

  useEffect(() => {
    if (right === 1) {
      setCircleMark([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]);
    } else if (right === 2) {
      setCircleMark([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]);
    } else if (right === 3) {
      setCircleMark([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]);
    } else if (right === 0) {
      setCircleMark([]);
    }
  }, [right]);

  const handleLeaveCircle = (num) => {
    setHoveredCircle();
    setCircleMark([]);
  };

  return (
    <div
      className="relative flex flex-wrap cursor-pointer"
      style={containerStyle}
      ref={containerRef} // Set the main container ref here
    >
      {nums.map((num) => (
        <div
          onClick={() => {
            handleNumClick(num);
          }}
          onMouseEnter={() => handleHover(num)} // Pass the current number to handleHover
          onMouseLeave={() => handleLeave(num)} // Pass the current number to handleLeave
          key={num}
          className={`containerRef${num} relative ${
            circleMark.includes(num)
              ? "before:content-[''] before:absolute before:inset-0 before:z-10 before:bg-gridNumbsHover"
              : ""
          } `} // Add a class to each number container
          style={{ border: "1px solid white", position: "relative" }}
        >
          <div
            className={clsx(
              "-translate-x-3/4 -translate-y-1/4 shadow-md shadow-gray-900 bg-quickPick border-2 border-dashed border-white",
              { hidden: !gridState.win.includes(num) },
              { block: gridState.win.includes(num) }
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

          <Number
            color={num === hoveredNum ? blackOrWhite(num) : getColor(num)}
            width={68}
            height={51}
            num={num}
          />

          {!(
            exceptions.left.includes(num) ||
            exceptions.specialLeft.includes(num)
          ) && (
            <div
              data-idx={`${1}-${num}`}
              onMouseEnter={() => handleCircle(1, num)} // Pass the current number to handleHover
              onMouseLeave={() => handleLeaveCircle(1)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickCircle(1, num);
              }}
              className="z-20 circle leftup"
              style={{
                top: "-9px",
                left: "-9px",
                backgroundColor:
                  hoveredCircle === 1 ||
                  gridState.cornerSplit.includes(`${1}-${num}`)
                    ? "#008000"
                    : "white",
                ...circleStyle,
                display: gridState.cornerSplit.includes(`${1}-${num}`)
                  ? "block"
                  : "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
                borderWidth: gridState.cornerSplit.includes(`${1}-${num}`)
                  ? "2px"
                  : "0",
                borderStyle: "dashed",
                borderColor: "#ffffff",
              }}
            ></div>
          )}
          <div
            data-idx={`${2}-${num}`}
            onMouseEnter={() => handleCircle(2, num)} // Pass the current number to handleHover
            onMouseLeave={() => handleLeaveCircle(2)}
            onClick={(e) => {
              e.stopPropagation();
              handleClickCircle(2, num);
            }}
            className="z-20 circle topmid"
            style={{
              top: "-9px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor:
                hoveredCircle === 2 ||
                gridState.cornerSplit.includes(`${2}-${num}`)
                  ? "#008000"
                  : "white",
              ...circleStyle,
              display: gridState.cornerSplit.includes(`${2}-${num}`)
                ? "block"
                : "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
              borderWidth: gridState.cornerSplit.includes(`${2}-${num}`)
                ? "2px"
                : "0",
              borderStyle: "dashed",
              borderColor: "#ffffff",
            }}
          ></div>
          {!exceptions.right.includes(num) && (
            <div
              data-idx={`${3}-${num}`}
              onMouseEnter={() => handleCircle(3, num)} // Pass the current number to handleHover
              onMouseLeave={() => handleLeaveCircle(3)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickCircle(3, num);
              }}
              className="z-20 circle rightup"
              style={{
                top: "-9px",
                right: "-9px",
                backgroundColor:
                  hoveredCircle === 3 ||
                  gridState.cornerSplit.includes(`${3}-${num}`)
                    ? "#008000"
                    : "white",
                ...circleStyle,
                display: gridState.cornerSplit.includes(`${3}-${num}`)
                  ? "block"
                  : "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
                borderWidth: gridState.cornerSplit.includes(`${3}-${num}`)
                  ? "2px"
                  : "0",
                borderStyle: "dashed",
                borderColor: "#ffffff",
              }}
            ></div>
          )}
          <div
            data-idx={`${4}-${num}`}
            onMouseEnter={() => handleCircle(4, num)} // Pass the current number to handleHover
            onMouseLeave={() => handleLeaveCircle(4)}
            onClick={(e) => {
              e.stopPropagation();
              handleClickCircle(4, num);
            }}
            className="z-20 circle leftmid"
            style={{
              top: "50%",
              left: "-9px",
              transform: "translateY(-50%)",
              backgroundColor:
                hoveredCircle === 4 ||
                gridState.cornerSplit.includes(`${4}-${num}`)
                  ? "#008000"
                  : "white",
              ...circleStyle,
              display: gridState.cornerSplit.includes(`${4}-${num}`)
                ? "block"
                : "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
              borderWidth: gridState.cornerSplit.includes(`${4}-${num}`)
                ? "2px"
                : "0",
              borderStyle: "dashed",
              borderColor: "#ffffff",
            }}
          ></div>
          {!exceptions.right.includes(num) && (
            <div
              data-idx={`${5}-${num}`}
              onMouseEnter={() => handleCircle(5, num)} // Pass the current number to handleHover
              onMouseLeave={() => handleLeaveCircle(5)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickCircle(5, num);
              }}
              className="z-20 circle rightmid"
              style={{
                top: "50%",
                right: "-9px",
                transform: "translateY(-50%)",
                backgroundColor:
                  hoveredCircle === 5 ||
                  gridState.cornerSplit.includes(`${5}-${num}`)
                    ? "#008000"
                    : "white",
                ...circleStyle,
                display: gridState.cornerSplit.includes(`${5}-${num}`)
                  ? "block"
                  : "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
                borderWidth: gridState.cornerSplit.includes(`${5}-${num}`)
                  ? "2px"
                  : "0",
                borderStyle: "dashed",
                borderColor: "#ffffff",
              }}
            ></div>
          )}
          {!exceptions.left.includes(num) && (
            <div
              data-idx={`${6}-${num}`}
              onMouseEnter={() => handleCircle(6, num)} // Pass the current number to handleHover
              onMouseLeave={() => handleLeaveCircle(6)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickCircle(6, num);
              }}
              className="z-20 circle leftbottom"
              style={{
                bottom: "-9px",
                left: "-9px",
                backgroundColor:
                  hoveredCircle === 6 ||
                  gridState.cornerSplit.includes(`${6}-${num}`)
                    ? "#008000"
                    : "white",
                ...circleStyle,
                display: gridState.cornerSplit.includes(`${6}-${num}`)
                  ? "block"
                  : "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
                borderWidth: gridState.cornerSplit.includes(`${6}-${num}`)
                  ? "2px"
                  : "0",
                borderStyle: "dashed",
                borderColor: "#ffffff",
              }}
            ></div>
          )}
          <div
            data-idx={`${7}-${num}`}
            onMouseEnter={() => handleCircle(7, num)} // Pass the current number to handleHover
            onMouseLeave={() => handleLeaveCircle(7)}
            onClick={(e) => {
              e.stopPropagation();
              handleClickCircle(7, num);
            }}
            className="z-20 circle bottommid"
            style={{
              bottom: "-9px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor:
                hoveredCircle === 7 ||
                gridState.cornerSplit.includes(`${7}-${num}`)
                  ? "#008000"
                  : "white",
              ...circleStyle,
              display: gridState.cornerSplit.includes(`${7}-${num}`)
                ? "block"
                : "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
              borderWidth: gridState.cornerSplit.includes(`${7}-${num}`)
                ? "2px"
                : "0",
              borderStyle: "dashed",
              borderColor: "#ffffff",
            }}
          ></div>
          {!exceptions.right.includes(num) && (
            <div
              data-idx={`${8}-${num}`}
              onMouseEnter={() => handleCircle(8, num)}
              onMouseLeave={() => handleLeaveCircle(8)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickCircle(8, num);
              }}
              className="z-20 circle rightbottom"
              style={{
                bottom: "-9px",
                right: "-9px",
                backgroundColor:
                  hoveredCircle === 8 ||
                  gridState.cornerSplit.includes(`${8}-${num}`)
                    ? "#008000"
                    : "white",
                ...circleStyle,
                display: gridState.cornerSplit.includes(`${8}-${num}`)
                  ? "block"
                  : "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                shadow: "0 0 0 1px #4a5568, 0 0 0 2px #1a202c",
                borderWidth: gridState.cornerSplit.includes(`${8}-${num}`)
                  ? "2px"
                  : "0",
                borderStyle: "dashed",
                borderColor: "#ffffff",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GridNums;
