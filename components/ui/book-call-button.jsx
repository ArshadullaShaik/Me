import { useRef } from "react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function BookCallButton({
  href = "https://cal.com/valoucard",
  className,
  spotlightColor = "rgba(255, 255, 255, 0.12)",
}) {
  const cardRef = useRef(null);

  const handleMove = (event) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <a
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative overflow-hidden inline-flex h-16 w-[320px] items-center justify-center gap-3 rounded-2xl bg-neutral-900 px-6 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02]",
        className,
      )}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
