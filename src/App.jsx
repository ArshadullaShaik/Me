import "./App.css";
import PixelSnow from "@/components/blocks/PixelSnow";
import ClickSpark from "@/components/blocks/ClickSpark";
import { HomeDemo } from "@/components/ui/demo";
import Shuffle from "@/components/blocks/Shuffle";
import About from "./components/About";
import Projects from "./components/Projects";
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SmoothCursor } from "@/components/ui/smooth-cursor";

function App() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <ReactLenis root>
      <SmoothCursor />
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <div className="relative w-full bg-black">
          <section className="sticky top-0 h-screen w-full overflow-hidden">
            <PixelSnow
              color="#ffffff"
              flakeSize={0.01}
              minFlakeSize={1.25}
              pixelResolution={200}
              speed={1.25}
              density={0.3}
              direction={125}
              brightness={1}
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
              <motion.div
                className="flex flex-col items-center text-center pointer-events-auto"
                style={{ scale: heroScale, opacity: heroOpacity }}
              >
                <Shuffle
                  text="Arshadulla"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                  tag="h1"
                  className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.22)] sm:text-7xl lg:text-8xl"
                />
                <div className="h-2 sm:h-3" />
                <Shuffle
                  text="Shaik"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                  tag="h2"
                  className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.22)] sm:text-6xl lg:text-7xl"
                />
              </motion.div>
            </div>
            <HomeDemo />
          </section>

          <About />
          <Projects />
        </div>
      </ClickSpark>
    </ReactLenis>
  );
}

export default App;
