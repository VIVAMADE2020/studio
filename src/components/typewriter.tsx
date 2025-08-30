"use client";

import { useState, useEffect } from "react";

type TypewriterProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
};

export function Typewriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2000,
}: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delay]);

  return <span className="min-h-[1.2em] inline-block">{displayedText}<span className="animate-pulse">|</span></span>;
}
