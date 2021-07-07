import { useState } from 'react';

export function useInput(initialValue, newValue) {
  const [value, setValue] = useState(initialValue);

  return {
    bind: {
      value: value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
    value: value,
    setInput: (newValue) => {
      setValue(newValue);
    },
  };
}
