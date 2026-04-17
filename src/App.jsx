import './App.css'
import Galaxy from "./components/Galaxy";
//import Navbar from "./components/Navbar";
import { HomeDemo } from "@/components/ui/demo";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Galaxy
        className="galaxy-container"
        style={{ width: "100%", height: "100%" }}
        mouseRepulsion
        mouseInteraction
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto">
          <HomeDemo />
        </div>
      </div>
    </div>
  );
}

export default App;
