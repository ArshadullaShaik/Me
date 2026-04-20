import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "DeadMan Switch Dapp",
    description: "a decentralized fail-safe for asset inheritance and theft prevention It secures funds in a password-protected smart contract, requiring regular pings to prevent automated transfers to beneficiaries. Featuring multi-wallet recovery and encrypted security, it ensures assets remain accessible even if a primary wallet is compromised.",
    tags: ["Solidity", "Python", "React", "Web3"],
    href: "https://github.com/ArshadullaShaik/Deadmanswitch",
  },
  {
    title: "TerraLedger",
    description: "A decentralized land title registry ensuring immutable ownership and fraud-proof real estate transactions via blockchain.",
    tags: ["Solidity", "React", "Web3", "IPFS"],
    href: "https://github.com/ArshadullaShaik/Landregistry",
  },
  {
    title: "HalfKilo",
    description: "A decentralized gaming ecosystem where in game loot is tokenized as tradeable NFTs, allowing players to own and monetize their digital achievements in a real value marketplace.",
    tags: ["Solidity", "NFTs (ERC-721)", "Web3 Gaming", "React"],
    href: "https://github.com/ArshadullaShaik/Halfkilo",
  },
  {
    title: "TrustAnchor Escrow",
    description: "My first project, an automated smart contract escrow service providing secure fund arbitration and conditional asset release.",
    tags: ["Solidity", "Security", "Smart Contracts"],
    href: "https://github.com/ArshadullaShaik/Escrow",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-black px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60"
        >
          PROJECTS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Selected builds with interaction-first design and production-grade on-chain logic.
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
            >
              <MagicCard mode="orb" glowFrom="#ee4f27" glowTo="#6b21ef" className="h-full min-h-[340px]">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <ArrowUpRight className="mt-1 shrink-0 text-white/70" size={18} />
                  </div>

                  <p className="mb-6 text-sm leading-7 text-white/75">{project.description}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="currentColor"
                    >
                      <path d="M12 0.3C5.4 0.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.3 0.6 0.1 0.8-0.3 0.8-0.6v-2.2c-3.3 0.7-4-1.4-4-1.4-0.5-1.4-1.3-1.8-1.3-1.8-1.1-0.8 0.1-0.8 0.1-0.8 1.2 0.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.4 3.5 1.1 0.1-0.8 0.4-1.4 0.8-1.7-2.7-0.3-5.6-1.3-5.6-6 0-1.3 0.5-2.4 1.2-3.2-0.1-0.3-0.5-1.6 0.1-3.2 0 0 1-0.3 3.3 1.2 1-0.3 2-0.4 3-0.4s2.1 0.1 3 0.4c2.3-1.5 3.3-1.2 3.3-1.2 0.7 1.7 0.3 2.9 0.1 3.2 0.8 0.9 1.2 1.9 1.2 3.2 0 4.7-2.9 5.7-5.7 6 0.5 0.4 0.9 1.2 0.9 2.3V23c0 0.3 0.2 0.7 0.8 0.6 4.8-1.6 8.2-6.1 8.2-11.3C24 5.7 18.6 0.3 12 0.3z" />
                    </svg>
                    GitHub
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
