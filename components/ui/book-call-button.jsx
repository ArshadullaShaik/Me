import { IconCalendarEvent } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function BookCallButton({
  href = "https://cal.com/valoucard",
  className,
}) {
  return (
    <a
      href={"https://cal.com/valoucard"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-16 w-[320px] items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-6 text-base font-semibold text-neutral-700 transition-all duration-200 hover:scale-[1.01] hover:bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800",
        className,
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
        <IconCalendarEvent className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
      </span>
      Book a Call
    </a>
  );
}
