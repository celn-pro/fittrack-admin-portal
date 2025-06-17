import { useCallback } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;

export const useGemini = () => {
  const generateContent = useCallback(async (prompt: string) => {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );
    const data = await response.json();
    // Adjust this depending on Gemini's response structure
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }, []);

  return { generateContent };
};