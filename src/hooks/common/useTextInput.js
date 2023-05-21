import { useState } from 'react';

const useTextInput = (initialValue = '') => {
  const [text, setText] = useState(initialValue);

  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const reset = () => {
    setText(initialValue);
  };

  return {
    text,
    handleChange,
    reset,
  };
};

export default useTextInput;
