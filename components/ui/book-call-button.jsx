import { useRef, useState } from "react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function BookCallButton({
  href = "https://cal.com/valoucard",
  className,
  spotlightColor = "rgba(255, 255, 255, 0.12)",
}) {
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
    <a
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerDown={handleEnter}
      onPointerLeave={handleLeave}
      onPointerUp={handleLeave}
      onPointerCancel={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative overflow-hidden inline-flex h-16 w-full max-w-[320px] items-center justify-center gap-3 rounded-2xl bg-neutral-900 px-6 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02]",
        className,
      )}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          isActive && "opacity-100"
        )}
        style={{
          background: `radial-gradient(220px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex w-full items-center justify-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
          <IconCalendarEvent className="h-5 w-5" />
        </span>
        Book a Call
      </div>
    </a>
  );
}
