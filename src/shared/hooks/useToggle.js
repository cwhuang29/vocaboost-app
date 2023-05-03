import { useCallback, useState } from 'react';

export default useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(prevState => !prevState), []);
  return [state, toggle];
};
