import { useState, useEffect } from 'react';

export function useMoodToggle() {
  const [mood, setMood] = useState<'zen' | 'user'>(() => {
    const storedMood = localStorage.getItem('mood');
    return (storedMood === 'zen' || storedMood === 'user') ? storedMood : 'user';
  });

  useEffect(() => {
    localStorage.setItem('mood', mood);
  }, [mood]);

  const toggleMood = () => {
    setMood(prevMood => prevMood === 'zen' ? 'user' : 'zen');
  };

  return { mood, toggleMood };
}
