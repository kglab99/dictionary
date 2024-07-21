import { fetchWord } from './api';

export const handleChange = (setter) => (event) => {
  setter(event.target.value);
};

export const handleKeyDown = (inputValue, setDefinition, setInputValue, setError, inputRef) => async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    setError(null);
    try {
      const data = await fetchWord(inputValue);
      setDefinition(data);
      setInputValue('');

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur(); 
        }
      }, 10);
    } catch (err) {
      setError(err.message);
      setDefinition(null); 
    }
  }
};
