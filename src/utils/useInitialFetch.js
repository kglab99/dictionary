import { useEffect } from 'react';
import { fetchWord } from './api'; 
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
  }, [setDefinition, setError]);
};
