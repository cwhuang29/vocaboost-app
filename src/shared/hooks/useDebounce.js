import { useEffect, useState } from 'react';

const defaultDelay = 3000;

// https://usehooks.com/useDebounce/
export default useDebounce = (value, delay = defaultDelay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
