import React, { useEffect, useState } from "react";

export default function Counter({ max }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (max) {
      const timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === max) {
            clearInterval(timer); // Stop the timer when count reaches max
            return prevCount;
          } else {
            return prevCount + 1;
          }
        });
      }, 5);

      return () => {
        clearInterval(timer);
      };
    }
  }, [max]);

  return <>{count}</>;
}