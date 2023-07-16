import React, { useContext, useEffect, useState } from "react";
const FunctionContext = React.createContext();

export function useFunction() {
  return useContext(FunctionContext);
}
export function FunctionProvider({ children }) {
  const [loading, setLoading] = useState(false);
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function capitalizeSentence(sentence) {
    let splitSentence = sentence.split(" ");
    let joined = [];
    const wordsToSkip = ["and", "to", "with"];
    splitSentence.forEach((word) => {
      word = word.toLowerCase();
      if (!wordsToSkip.includes(word)) {
        joined.push(capitalize(word));
      } else {
        joined.push(word);
      }
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
    const keysToSkip = [
      "middle_name",
      "suffix",
      "primary_evaluator",
      "secondary_evaluator",
      "tertiary_evaluator",
    ];
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
            newValue: obj2[key],
          });
        }
      }
    }

    for (let key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        differences.push({
          key: key,
          oldValue: undefined,
          newValue: obj2[key],
        });
      }
    }

    return differences;
  }

  function removeSubText(text) {
    const tempString = text.split("(");
    return tempString[0];
  }
  function calculateGradeColor(grade) {
    // Calculate the normalized value between 0 and 1 based on the grade range
    const normalizedGrade = (grade - 1.0) / 3.0;

    // Calculate the RGB components based on the normalized grade
    const red = Math.round(255 * (1 - normalizedGrade));
    const green = Math.round(255 * normalizedGrade);
    const blue = 0;

    // Convert RGB values to hexadecimal
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Construct the hexadecimal color code
    return `#${redHex}${greenHex}${blueHex}`;
  }
  const value = {
    loading,
    getPath,
    splitKey,
    splitPath,
    setLoading,
    capitalize,
    formatName,
    reformatName,
    removeSubText,
    capitalizePath,
    areValuesFilled,
    capitalizeSentence,
    compareObjectArrays,
    calculateGradeColor,
  };

  return (
    <FunctionContext.Provider value={value}>
      {children}
    </FunctionContext.Provider>
  );
}
