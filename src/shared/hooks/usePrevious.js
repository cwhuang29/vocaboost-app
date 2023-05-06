import { useEffect, useRef } from 'react';

// This would work for props, state, or any other calculated value
const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
