import React, { useContext, useEffect, useState } from "react";
const FunctionContext = React.createContext();

export function useFunction() {
  return useContext(FunctionContext);
}
export function FunctionProvider({ children }) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function capitalizeSentence(sentence) {
    let splitSentence = sentence.split(" ");
    let joined = [];
    splitSentence.forEach((word) => {
      joined.push(capitalize(word));
    });
    return joined.join(" ");
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
      let temp = reformatName(s);
      capitalizedPath += "/" + capitalize(temp);
    });

    return capitalizedPath.substring(1);
  }
  function getPath() {
    return window.location.pathname;
  }

  function areValuesFilled(obj) {
    const keysToSkip = ["middle_name", "immediate_supervisor"];
    const values = Object.keys(obj)
      .filter((key) => !keysToSkip.includes(key))
      .map((key) => obj[key]);
    return values.every((value) => value !== "");
  }
  function formatName(name) {
    return name.split(" ").join("_");
  }

  function reformatName(name) {
    return name.split("_").join(" ");
  }
  function compareObjectArrays(obj1, obj2) {
    const differences = [];

    for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differences.push({
            key: key,
            oldValue: obj1[key],
            newValue: obj2[key]
          });
        }
      }
    }
  
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        differences.push({
          key: key,
          oldValue: undefined,
          newValue: obj2[key]
        });
      }
    }
  
    return differences;
  }

  function removeSubText(text){
    const tempString = text.split("(");
    return tempString[0];
  }
  const value = {
    getPath,
    splitKey,
    splitPath,
    capitalize,
    formatName,
    reformatName,
    removeSubText,
    capitalizePath,
    areValuesFilled,
    capitalizeSentence,
    compareObjectArrays,
  };

  return (
    <FunctionContext.Provider value={value}>
      {children}
    </FunctionContext.Provider>
  );
}
