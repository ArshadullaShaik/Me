import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import Arshad from "../assets/Arshad.jpeg";
import ResumePdf from "../assets/Resumeupd.pdf";

const container = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-black"
    >
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <div className="group relative">
              {/* Soft glow disc behind the portrait */}
              <div className="absolute -inset-10 rounded-full bg-white/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
              <img
                src={Arshad}
                alt="Arshadulla Shaik"
                className="relative h-64 w-64 rounded-full border border-white/20 object-cover shadow-[0_0_40px_rgba(255,255,255,0.18)] transition-transform duration-300 group-hover:scale-[1.02] sm:h-116 sm:w-86"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-6 text-white">
            <motion.p
              variants={item}
              className="text-xs uppercase tracking-[0.35em] text-white/60"
            >
              ABOUT ME
            </motion.p>

            <motion.h2
              variants={item}
              className="text-4xl font-semibold tracking-tight drop-shadow-[0_0_22px_rgba(255,255,255,0.18)] sm:text-5xl"
            >
              Engineering decentralized logic into immersive interfaces.
            </motion.h2>

            <motion.div variants={item} className="space-y-1">
              <p className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.16)] sm:text-2xl">
                Me? I’m a Blockchain Developer and Frontend Engineer constructing decentralized apps, secure smart contracts, and techy frontend webpages. I specialize in bridging the gap between robust on-chain logic and immersive user experiences
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-xl text-sm leading-7 text-white/70 sm:text-base"
            >
              
            </motion.p>

            <motion.div variants={item} className="grid gap-3 sm:grid-cols-2">
              {[
                "BlockChain + Web3",
                "Frontend Developer",
                "Smart Contracts",
                "UI Engineering + Motion",
              ].map((skill) => (
                <SpotlightCard
                  key={skill}
                  spotlightColor="rgba(147, 197, 253, 0.18)"
                  className="text-sm"
                >
                  {skill}
                </SpotlightCard>
              ))}
            </motion.div>

            <motion.div variants={item}>
              <a
                href={ResumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/20 bg-white px-6 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
