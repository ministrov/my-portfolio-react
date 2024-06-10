// This hook is saving dark mode value into the localStorage

import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting storage value
  const saved = localStorage.getItem(key);
  console.log(saved);
  const initial = JSON.parse(saved);
  // console.log(initial);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  // const [value, setValue] = useState(() => {
  //   return getStorageValue(key, defaultValue);
  // });
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));
  console.log(defaultValue);

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));

  }, [key, value]);

  return [value, setValue];
}