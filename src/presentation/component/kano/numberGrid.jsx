import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { addNumber } from "../../../stores/keno/kenoSlice";

const NumberGrid = function () {
  const numbers = useSelector((state) => state.keno.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      {[...Array(8).keys()].map((row) => {
        return (
          <>
            <div key={row} className="flex justify-around w-full gap-2">
              {[...Array(10).keys()].map((num) => {
                return (
                  <button
                    disabled={numbers.length === 10}
                    onClick={() => dispatch(addNumber(row * 10 + num + 1))}
                    key={row * 10 + num + 1}
                    className={clsx(
                      "cursor-pointer rounded-full w-[45px] h-[45px] text-[20px] text-white grid place-items-center hover:bg-redeem",
                      {
                        "bg-quickPick": numbers.includes(row * 10 + num + 1),
                        "bg-head": row * 10 + num + 1 <= 40,
                        "tail-background":
                          row * 10 + num + 1 > 40 &&
                          !numbers.includes(row * 10 + num + 1),
                      }
                    )}
                  >
                    {row * 10 + num + 1}
                  </button>
                );
              })}
            </div>
            {row === 3 ? (
              <div className="h-[1.5px] rounded-[50%] w-full horizontal-background"></div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
};

export default NumberGrid;
