import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import Arshad from "../assets/Arshad.jpeg";
import ResumePdf from "../assets/Resumeupd.pdf";
import { NoiseBackground } from "@/components/ui/noise-background";
import { Particles } from "@/components/ui/particles";
import { ConfettiButton } from "@/components/ui/confetti";
import { BorderBeam } from "@/components/ui/border-beam";

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
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

function About() {
  const handleResumeDownload = () => {
    window.setTimeout(() => {
      window.open(ResumePdf, "_blank", "noopener,noreferrer");
    }, 140);
  };

  return (
    <section
      id="about"
      className="relative z-20 min-h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="relative h-[500px] w-full overflow-hidden">
          <Particles quantity={130} size={1.1} ease={70} color="#ffffff" className="size-full opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />
      </div>
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
            <div className="overflow-hidden">
              <motion.p
                variants={item}
                className="text-xs uppercase tracking-[0.35em] text-white/60 inline-block"
              >
                ABOUT ME
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                variants={item}
                className="text-4xl font-semibold tracking-tight drop-shadow-[0_0_22px_rgba(255,255,255,0.18)] sm:text-5xl"
              >
                Engineering decentralized logic into immersive interfaces.
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.div variants={item} className="space-y-1">
                <p className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.16)] sm:text-2xl">
                  Me? I’m a Blockchain Developer and Frontend Engineer constructing decentralized apps, secure smart contracts, and techy frontend webpages. I specialize in bridging the gap between robust on-chain logic and immersive user experiences
                </p>
              </motion.div>
            </div>

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
                "Linux Enthusiast",
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
              <NoiseBackground
                containerClassName="w-fit p-[2px] rounded-full"
                gradientColors={[
                  "rgb(255, 100, 150)",
                  "rgb(100, 150, 255)",
                  "rgb(255, 200, 100)",
                ]}
              >
                <ConfettiButton
                  onClick={handleResumeDownload}
                  options={{
                    particleCount: 90,
                    spread: 85,
                    startVelocity: 45,
                    scalar: 1.05,
                  }}
                  className="relative overflow-hidden inline-flex h-full w-full items-center justify-center cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-6 py-2 text-sm font-semibold text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]"
                >
                  <BorderBeam size={60} duration={4} delay={9} borderWidth={2} />
                  Download Resume
                </ConfettiButton>
              </NoiseBackground>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
