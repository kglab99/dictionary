// useInitialFetch.js
import { useEffect } from 'react';
import { fetchWord } from './api'; // Import the fetchWord function

export const useInitialFetch = (setDefinition, setError) => {
  useEffect(() => {
    const fetchInitialDefinition = async () => {
      try {
        const initialData = await fetchWord("programming");
        setDefinition(initialData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInitialDefinition();
  }, [setDefinition, setError]); // Include dependencies if they change
};
