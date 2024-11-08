import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { getBetAction } from "../../stores/bet/getBetAction";
import BetDataUI from "../component/cancel/betDataUI";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Cancel = (props) => {
  const [input, setInput] = useState("");
  const [currentBetData, setCurrentBetData] = useState({});
  const [NoBetFound, setNoBetFound] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = (char) => {
    if (char === "10") {
      setInput((prevInput) => prevInput + "L");
    } else if (char === "11") {
      setInput((prevInput) => prevInput + "0");
    } else if (char === "12") {
      setInput((prevInput) => prevInput.slice(0, prevInput.length - 1));
    } else {
      setInput((prevInput) => prevInput + char);
    }
  };

  useEffect(() => {
    // add an autofocus to the input field
    const inputField = document.querySelector("input[name=cancelInput]");
    inputField.focus();
  }, [props.currentTab]);

  const handleBetData = async () => {
    if (input.length === 0) {
      Notification({
        message: "Please enter a valid betslip code",
        type: "error",
      });
    } else {
      try {
        setLoading(true); // Start loading
        const response = await dispatch(getBetAction(input));
        if (response.payload) {
          setCurrentBetData(response.payload);
        } else {
          setNoBetFound(true);
        }
      } catch (error) {
        setNoBetFound(true);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div
      className={clsx(
        "absolute z-30 min-w-full min-h-full bg-darkGray bg-opacity-70 flex flex-col items-center ",
        { hidden: props.currentTab !== "cancel" }
      )}
      style={{
        paddingBottom: "6rem",
      }}
    >
      <div className="w-[1200px] flex flex-col bg-white gap-4 mt-20 rounded-lg">
        <div className="flex justify-between w-full px-5 py-2 text-white rounded-t-lg bg-cashierOption">
          <h2>Cancel Betslip</h2>

          <div
            onClick={() => {
              props.setCurrentTab("");
              setInput("");
              setCurrentBetData([]);
            }}
            className="cursor-pointer bg-transparent h-[20px] w-[20px] relative"
          >
            <div className="absolute w-1/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-3/4"></div>
            <div className="absolute w-3/4 rotate-45 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-darkGray h-1/4"></div>
          </div>
        </div>

        <div className="w-[1200px] flex">
          <div className="w-[400px] pb-10 grid grid-cols-1 gap-5 ml-8">
            <h2 className="text-green-600 text-[1.3rem]">
              Enter betslip code or scan
            </h2>

            <input
              className="border-[1px] border-gray-300 rounded-md w-11/12 px-2 py-2"
              type="text"
              name="cancelInput"
              value={input}
              onInput={(event) => {
                setInput(event.target.value);
              }}
              placeholder="Enter betslip code"
              autoFocus={props.currentTab === "cancel"}
            />

            <div className="grid grid-cols-3 gap-5">
              {[...Array(12).keys()].map((element) => {
                return (
                  <div
                    key={element}
                    className="flex items-center justify-center w-full h-full p-3 text-white rounded-lg cursor-pointer bg-cashierOption"
                    onClick={() => {
                      handleClick((element + 1).toString());
                    }}
                  >
                    {element === 9 ? (
                      "L"
                    ) : element === 10 ? (
                      0
                    ) : element === 11 ? (
                      <MdKeyboardBackspace fill={"white"} />
                    ) : (
                      element + 1
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between px-3">
              <button
                onClick={() => {
                  setInput("");
                  setCurrentBetData([]);
                }}
                className="flex items-center gap-1 px-5 py-2 rounded-md h-fit bg-tableGray"
              >
                Clear
              </button>

              <button
                className="flex items-center gap-1 px-5 py-2 text-white rounded-md h-fit bg-cashierOption"
                onClick={handleBetData}
              >
                Enter
              </button>
            </div>
          </div>
          {loading ? (
            <h2 className="text-green-600 text-[1.3rem] flex p-10">
              <FaSpinner className="mr-2 text-green-500 animate-spin" />{" "}
              Loading...
            </h2>
          ) : currentBetData.length > 0 ? (
            <BetDataUI
              betData={{
                currentBetData,
                input,
              }}
            />
          ) : (
            input.length > 0 &&
            NoBetFound && (
              <h2 className="text-green-600 text-[1.3rem]">No betslip found</h2>
            )
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Cancel;
