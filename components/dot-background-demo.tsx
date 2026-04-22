import { cn } from "@/lib/utils";
import React from "react";

export default function DotBackgroundDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:16px_16px]",
          "[background-image:radial-gradient(#e5e5e5_1.2px,transparent_1.1px)]",
          "dark:[background-image:radial-gradient(#9a9a9a_1.2px,transparent_1.1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
