import { useState, useEffect } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch(url);
      const data = res.json();

      setData(data);
    }

    getData();
  }, [url]);

  return { data };
};
