import React, { useState, useEffect, useRef } from "react";
const words = ["chat.", "order food.", "shop for clothes."];

const WordChanger = () => {
  const [currWord, setcurrWord] = useState(0);

  useEffect(() => {
    const intervalid = setInterval(() => {
      setcurrWord((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
    return () => clearInterval(intervalid);
  });
  return <>{words[currWord]}</>;
};

export default WordChanger;
