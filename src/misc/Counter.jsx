import React, { useEffect, useState } from "react";

export default function Counter({ max }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (count === max) return;

      setCount((prevCount) => prevCount + 1);
    }, 25);

    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return <>{count}</>;
}
