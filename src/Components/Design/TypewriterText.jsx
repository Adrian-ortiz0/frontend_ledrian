import { useState, useEffect } from "react";

// Componente reutilizable TypewriterText
const TypewriterText = ({ texts = [], className = "", delay = 100, fontSize = "text-xl" }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Hook que maneja el efecto de la máquina de escribir
  useEffect(() => {
    if (texts.length === 0) return;  // Si no hay textos, no hacer nada

    const currentText = texts[textIndex];
    let typingTimeout;

    // Efecto de máquina de escribir
    if (isTyping) {
      let i = 0;
      typingTimeout = setInterval(() => {
        setDisplayText((prev) => prev + currentText[i]);
        i++;
        if (i === currentText.length) {
          clearInterval(typingTimeout);
          setIsTyping(false);  // Termina de escribir
          setTimeout(() => setIsTyping(true), 1000); // Pausa antes de cambiar el texto
        }
      }, delay);
    } else {
      // Cuando termina de escribir, cambia al siguiente texto
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setDisplayText(""); // Limpiar el texto
      }, 1000); // Pausa antes de cambiar el texto
    }

    return () => clearInterval(typingTimeout); // Limpiar el intervalo cuando el componente se desmonte

  }, [textIndex, isTyping, texts, delay]); // Dependencias

  return (
    <span className={`${fontSize} ${className}`}>
      {displayText}
    </span>
  );
};

export default TypewriterText;
