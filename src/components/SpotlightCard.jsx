import { useRef, useState } from "react";

function SpotlightCard({ children, className = "", spotlightColor = "rgba(147, 197, 253, 0.18)" }) {
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleMove = (event) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Number.isFinite(event.clientX) ? event.clientX - rect.left : rect.width / 2;
    const y = Number.isFinite(event.clientY) ? event.clientY - rect.top : rect.height / 2;
    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleEnter = (event) => {
    setIsActive(true);
    handleMove(event);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    setIsActive(false);
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerDown={handleEnter}
      onPointerLeave={handleLeave}
      onPointerUp={handleLeave}
      onPointerCancel={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm text-white/75 ${className}`}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" }}
    >
      {/* Cursor-following glow */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`}
        style={{
          background: `radial-gradient(220px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default SpotlightCard;
