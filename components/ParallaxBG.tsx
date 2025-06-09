// components/ParallaxBG.tsx
"use client";
import { useState } from "react";

export default function ParallaxBG() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      className="parallax-bg"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setPos({ x, y });
      }}
      style={{ "--mx": `${pos.x}%`, "--my": `${pos.y}%` } as React.CSSProperties}
    >
      <div className="parallax-blob parallax-blob-1" />
      <div className="parallax-blob parallax-blob-2" />
      <div className="parallax-blob parallax-blob-3" />
    </div>
  );
}
