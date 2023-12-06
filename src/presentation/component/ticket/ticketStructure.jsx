import React, { useEffect } from "react";

const Ticket = () => {
  useEffect(() => {
    const betSuccess = localStorage.getItem("printBet");
    if (betSuccess === "true") {
      window.print();
    }
  }, []);

  return (
    <div className="max-w-md p-4 mx-auto bg-black border border-gray-300 rounded">
      test
    </div>
  );
};

export default Ticket;
