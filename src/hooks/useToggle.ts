import { useState, useCallback } from 'react';

export const useToggle = (initialState = false): [boolean, (nextValue?: boolean) => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((nextValue?: boolean) => {
    if (typeof nextValue === 'boolean') {
      setState(nextValue);
    } else {
      setState((state) => !state);
    }
  }, []);

  return [state, toggle];
}; 