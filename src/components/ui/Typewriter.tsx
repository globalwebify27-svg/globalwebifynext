"use client";

import React, { useState, useEffect } from 'react';

const phrases = [
  "वेबसाइट जो ब्रांड भी बनाए, बिज़नेस भी बढ़ाए।",
  "If You Can't Track It, You Can't Grow It.",
  "Turn Every Visitor Into a Potential Customer.",
  "Grow Your Business With AI Powered Marketing."
];

export default function Typewriter() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(70);

        if (currentText === fullPhrase) {
          setIsDeleting(true);
          setTypingSpeed(3000); // Wait 3 seconds before deleting
        }
      } else {
        // Deleting
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <span className="text-primary border-r-4 border-primary animate-pulse min-h-[1.2em] inline-block">
      {currentText}
    </span>
  );
}
