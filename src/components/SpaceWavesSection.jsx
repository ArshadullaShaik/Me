import { motion } from "framer-motion";
import SpaceWavesMiniGame from "./SpaceWavesMiniGame";

export default function SpaceWavesSection() {
  return (
    <section id="space-waves" className="relative min-h-[65vh] w-full bg-black px-6 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-white/60"
          >
            MINI GAME
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Space Waves
          </motion.h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Hold to go up, release to go down. Stay in the lane and survive as speed ramps.
          </p>
        </div>

        <SpaceWavesMiniGame />
      </div>
    </section>
  );
}
