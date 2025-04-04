import { useState, useEffect } from 'react';

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // flag to track mounted state

    setTimeout(() => {
      async function getData() {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const jsonData = await res.json();
          if (isMounted) {
            setData(jsonData);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message);
            setData(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }

      getData();
    }, 5000);

    setLoading(true);

    return () => {
      isMounted = false; // cleanup function
    };
  }, [url]);

  return { data, loading, error };
};
