import { fetchWord } from './api';

export const handleChange = (setter) => (event) => {
  setter(event.target.value);
};

export const handleKeyDown = (inputValue, setDefinition, setInputValue, setError, inputRef) => async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    setError(null); // Clear the error state before making the fetch request
    try {
      const data = await fetchWord(inputValue);
      setDefinition(data); // Update the state
      setInputValue(''); // Clear the input field

      // Use a short timeout to ensure blur happens after state updates
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur(); // Unfocus the input field
        }
      }, 0);
    } catch (err) {
      setError(err.message);
      setDefinition(null); // Clear the definition state
    }
  }
};
