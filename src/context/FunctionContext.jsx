import React, { useContext, useEffect, useState } from "react";
const FunctionContext = React.createContext();

export function useFunction() {
  return useContext(FunctionContext);
}
export function FunctionProvider({ children }) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function splitKey(key) {
    let tempString = [];
    const str = key.split("_");

    str.forEach((s) => {
      tempString.push(capitalize(s));
    });
    return tempString.join(" ");
  }
  function splitPath(path) {
    return path.split("/");
  }
  function capitalizePath(path) {
    const split = splitPath(path);
    let capitalizedPath = "";
    split.slice(1).forEach((s) => {
      capitalizedPath += "/" + capitalize(s);
    });

    return capitalizedPath.substring(1);
  }
  function getPath() {
    return window.location.pathname;
  }

  function areValuesFilled(obj) {
    const values = Object.values(obj);
    return values.every(value => value !== "");
  }

  const value = {
    capitalize,
    splitPath,
    getPath,
    capitalizePath,
    splitKey,
    areValuesFilled,
  };

  return (
    <FunctionContext.Provider value={value}>
      {children}
    </FunctionContext.Provider>
  );
}
