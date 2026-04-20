import confetti from "canvas-confetti";
import { useCallback } from "react";

export function Confetti({ options = {} }) {
  const launch = useCallback(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      startVelocity: 40,
      zIndex: 120,
      disableForReducedMotion: true,
      ...options,
    });
  }, [options]);

  return { launch };
}

export function ConfettiButton({
  children,
  options = {},
  onClick,
  className,
  ...props
}) {
  const { launch } = Confetti({ options });

  const handleClick = useCallback(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 70,
        startVelocity: 40,
        zIndex: 120,
        disableForReducedMotion: true,
        ...options,
        origin: { x, y },
      });

      if (onClick) onClick(event);
    },
    [onClick, options],
  );

  return (
    <button type="button" onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}
