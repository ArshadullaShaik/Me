import FloatingDockDemo from "@/components/floating-dock-demo";
import DotBackgroundDemo from "@/components/dot-background-demo";
import BookCallButton from "@/components/ui/book-call-button";
import SpaceWavesMiniGame from "./SpaceWavesMiniGame";
import { motion } from "framer-motion";

function Contact() {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-black px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-55">
        <DotBackgroundDemo />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60"
        >
          CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Let’s build something that feels futuristic and reliable.
        </motion.h2>

        <p className="mb-8 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          Reach out through any of the links below. I am open to Web3 collaborations,
          frontend engineering roles, and freelance product builds.
        </p>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,560px)_1fr]">
          <div className="justify-self-center xl:justify-self-start">
            <SpaceWavesMiniGame />
          </div>

          <div className="mt-12 flex flex-col items-center gap-5 sm:mt-14 md:mt-16 xl:mt-20 xl:items-end">
            <FloatingDockDemo />
            <BookCallButton href="https://cal.com/valoucard" />
          </div>
        </div>

        <div className="mt-32 flex w-full flex-col items-center justify-center pb-8 text-center">
          <div className="mb-8 h-px w-full max-w-sm bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <p className="mb-4 text-base text-white/90 sm:text-lg">Always building. Always shipping</p>
          <p className="text-[14px] uppercase tracking-[0.25em] text-white/75 sm:text-xs">
            MADE WITH LOVE AND PASSION BY : ARSHADULLA SHAIK
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
