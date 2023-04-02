import React, { useContext, useEffect, useState } from "react";

const TouchContext = React.createContext();

export function useTouch() {
  return useContext(TouchContext);
}
export function TouchProvider({ children }) {
  const [sidebar, toggleSidebar] = useState(false);

  let xDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
  }

  function handleTouchMove(evt) {
    if (!xDown) {
      return;
    }
    let xDiff = xDown - evt.touches[0].clientX;
    if (xDiff > 0) {
      alert("swipe left");
    } else {
      toggleSidebar(true);
    }
    xDown = null;
  }

  function handleTouchEnd(evt) {
    xDown = null;
  }

  useEffect(() => {
    // Add touch event listeners
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Remove touch event listeners on unmount
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const value = {
    sidebar,
  };
  return <TouchContext.Provider value={value}>{children}</TouchContext.Provider>;
}
