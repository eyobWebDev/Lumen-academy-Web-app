import { useEffect, useState } from "react";


export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `
            radial-gradient(700px at ${position.x}px ${position.y}px, rgba(56, 130, 195, 0.05), transparent 80%),
            radial-gradient(700px at ${position.x}px ${position.y}px, rgba(56, 130, 195, 0.08), transparent 70%)
        `,
    }}

    />
  );
}
