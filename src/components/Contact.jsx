import FloatingDockDemo from "@/components/floating-dock-demo";
import DotBackgroundDemo from "@/components/dot-background-demo";
import BookCallButton from "@/components/ui/book-call-button";
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

        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center">
          <BookCallButton href="https://cal.com/your-username" />
          <FloatingDockDemo />
        </div>
      </div>
    </section>
  );
}

export default Contact;
