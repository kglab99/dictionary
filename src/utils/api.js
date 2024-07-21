export async function fetchWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Word not found');
    }
    return await response.json();
  }
  