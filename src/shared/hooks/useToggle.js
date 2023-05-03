import { useCallback, useState } from 'react';

export default useToggle = initialState => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(prevState => !prevState), []);
  return [state, toggle];
};
