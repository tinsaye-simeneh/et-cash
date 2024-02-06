import React from "react";
import Barcode from "react-barcode";

export class Ticket extends React.PureComponent {
  render() {
    const slipResponse = JSON.parse(localStorage.getItem("slipResponse"));
    const CurrentDateandTime = new Date().toLocaleString();
    const totalAmountCalculater = (games) => {
      let ret = 0;
      for (let game of games) {
        ret += game.amount;
      }
      return ret;
    };
    const totalWinCalculater = (games) => {
      let ret = 0;
      for (let game of games) {
        ret += game.amount * game.odd;
      }
      return ret;
    };

    const minPayout = (games) => {
      let ret = 0;
      for (let game of games) {
        ret += game.amount * game.odd;
      }
      return ret;
    };

    return (
      slipResponse && (
        <div className="w-fit flex flex-col items-center text-[1rem] px-10 pt-14">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[3rem] text-gray-500 justify-self-center">
              LOGO
            </h2>

            <div className="flex flex-col items-end">
              <p>{slipResponse?._id}</p>

              <p>{localStorage.getItem("retailerName")}</p>

              <p>{localStorage.getItem("username")}</p>

              <p>
                {CurrentDateandTime.split(",")[0] +
                  " " +
                  CurrentDateandTime.split(",")[1]}{" "}
                (UTC+3)
              </p>
            </div>
          </div>

          {this.props.slips?.map((element) => {
            return (
              <div className="flex justify-between w-full px-3 mt-5">
                <div className="flex flex-col items-start">
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    {element.game}
                  </h2>
                  <p>
                    {element.gameType + element.date + "#" + element.gameId}
                  </p>
                  <p className="ml-3">{element.value}</p>
                </div>

                <h2 className="mt-2 font-bold">Br {element?.amount}</h2>
              </div>
            );
          })}

          <div className="w-full mt-3">
            <div className="flex justify-between w-full px-3 font-bold">
              <h2>Total Stake</h2>
              <h2>Br {totalAmountCalculater(this.props.slips)}</h2>
            </div>

            <div className="flex flex-col w-full border-black border-[1.3px] px-3">
              <div className="flex justify-between w-full font-bold">
                <h2>Min Payout(Incl. Stake)</h2>
                <h2>Br {minPayout(this.props.slips)}</h2>
              </div>
              <div className="flex justify-between w-full font-bold">
                <h2>Max Payout(Incl. Stake)</h2>
                <h2>Br {totalWinCalculater(this.props.slips)}</h2>
              </div>
            </div>
          </div>

          <div>
            <Barcode value={slipResponse?._id} height={50} />
          </div>
        </div>
      )
    );
  }
}
