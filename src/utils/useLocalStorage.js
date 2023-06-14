import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting storage value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, setValue]);
}