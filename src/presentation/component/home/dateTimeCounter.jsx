import React, { useState, useEffect } from 'react';

const DateTimeCounter = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  // Formatting the date and time
  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="text-[0.7rem]">
      <p>{formattedDateTime}</p>
    </div>
  );
};

export default DateTimeCounter;
