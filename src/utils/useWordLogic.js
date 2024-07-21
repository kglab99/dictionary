// useWordLogic.js
import { useState } from 'react';

export function useWordLogic(definition) {
  const allMeanings = definition.flatMap(entry => entry.meanings);
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState(allMeanings[0]?.partOfSpeech || '');

  const partOfSpeechButtons = [...new Set(allMeanings.map(meaning => meaning.partOfSpeech))];
  const currentMeanings = allMeanings.filter(meaning => meaning.partOfSpeech === selectedPartOfSpeech);

  const phonetics = definition.flatMap(entry => entry.phonetics);
  const audioUrl = phonetics.find(phonetic => phonetic.audio)?.audio;
  const phoneticText = phonetics.find(phonetic => phonetic.text)?.text;

  return {
    selectedPartOfSpeech,
    setSelectedPartOfSpeech,
    partOfSpeechButtons,
    currentMeanings,
    phoneticText,
    audioUrl
  };
}
