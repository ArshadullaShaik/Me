import { useEffect, useRef, useState } from "react";

// Tweak these values to customize gameplay feel.
const GAME_CONFIG = {
  baseSpeed: 2.6,
  speedRampPerScore: 0.05,
  speedRampPerSecond: 0.015,
  shipXRatio: 0.22,
  shipSize: 10,
  waveVelocity: 3.1,
  velocitySmoothing: 0.22,
  baseGapHeight: 120,
  minGapHeight: 78,
  obstacleWidth: 20,
  obstacleSpacing: 165,
  backgroundDotGap: 18,
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function createObstacle(x, height, score) {
  const gapHeight = clamp(
    GAME_CONFIG.baseGapHeight - score * 1.2,
    GAME_CONFIG.minGapHeight,
    GAME_CONFIG.baseGapHeight,
  );
  const pad = 26;
  const minY = pad + gapHeight / 2;
  const maxY = height - pad - gapHeight / 2;
  const gapY = minY + Math.random() * Math.max(1, maxY - minY);

  return {
    x,
    width: GAME_CONFIG.obstacleWidth,
    gapY,
    gapHeight,
    passed: false,
  };
}

export default function SpaceWavesMiniGame() {
  const HIGH_SCORE_KEY = "space-waves-high-score";
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const pointerDownRef = useRef(false);
  const dimensionsRef = useRef({ width: 400, height: 230, dpr: 1 });

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [crashed, setCrashed] = useState(false);

  const gameRef = useRef({
    shipY: 120,
    shipVY: 0,
    obstacles: [],
    trail: [],
    elapsed: 0,
    score: 0,
    gameOver: false,
    lastTs: 0,
  });

  const resetGame = () => {
    const { height, width } = dimensionsRef.current;

    gameRef.current = {
      shipY: height * 0.5,
      shipVY: 0,
      obstacles: [
        createObstacle(width + 120, height, 0),
        createObstacle(width + 120 + GAME_CONFIG.obstacleSpacing, height, 0),
      ],
      trail: [],
      elapsed: 0,
      score: 0,
      gameOver: false,
      lastTs: performance.now(),
    };

    setScore(0);
    setCrashed(false);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    if (Number.isFinite(parsed) && parsed > 0) {
      setHighScore(parsed);
    }
  }, []);

  useEffect(() => {
    if (score <= highScore) return;
    setHighScore(score);
    window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
  }, [score, highScore]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const width = Math.max(280, Math.floor(rect.width));
      const height = Math.max(180, Math.floor(rect.height));
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dimensionsRef.current = { width, height, dpr };

      if (!gameRef.current.obstacles.length) {
        resetGame();
      }
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const loop = (ts) => {
      const game = gameRef.current;
      const { width, height, dpr } = dimensionsRef.current;
      const shipX = width * GAME_CONFIG.shipXRatio;

      const dt = clamp((ts - (game.lastTs || ts)) / 16.6667, 0.5, 2.2);
      game.lastTs = ts;

      if (!game.gameOver) {
        game.elapsed += dt / 60;

        const speed =
          GAME_CONFIG.baseSpeed +
          game.score * GAME_CONFIG.speedRampPerScore +
          game.elapsed * GAME_CONFIG.speedRampPerSecond;

        const targetVY = pointerDownRef.current ? -GAME_CONFIG.waveVelocity : GAME_CONFIG.waveVelocity;
        game.shipVY += (targetVY - game.shipVY) * GAME_CONFIG.velocitySmoothing;
        game.shipY += game.shipVY * dt;
        game.shipY = clamp(game.shipY, GAME_CONFIG.shipSize + 4, height - GAME_CONFIG.shipSize - 4);

        for (const obstacle of game.obstacles) {
          obstacle.x -= speed * dt;

          if (!obstacle.passed && obstacle.x + obstacle.width < shipX) {
            obstacle.passed = true;
            game.score += 1;
            setScore(game.score);
          }
        }

        while (game.obstacles.length && game.obstacles[0].x + game.obstacles[0].width < -4) {
          game.obstacles.shift();
        }

        const last = game.obstacles[game.obstacles.length - 1];
        if (!last || last.x < width - GAME_CONFIG.obstacleSpacing) {
          game.obstacles.push(createObstacle(width + 40, height, game.score));
        }

        game.trail.push({ x: shipX, y: game.shipY });
        if (game.trail.length > 24) game.trail.shift();

        const shipRadius = GAME_CONFIG.shipSize * 0.65;
        const hitBoundary = game.shipY <= shipRadius || game.shipY >= height - shipRadius;

        let hitObstacle = false;
        for (const obstacle of game.obstacles) {
          const inX = shipX + shipRadius > obstacle.x && shipX - shipRadius < obstacle.x + obstacle.width;
          if (!inX) continue;

          const gapTop = obstacle.gapY - obstacle.gapHeight / 2;
          const gapBottom = obstacle.gapY + obstacle.gapHeight / 2;
          if (game.shipY - shipRadius < gapTop || game.shipY + shipRadius > gapBottom) {
            hitObstacle = true;
            break;
          }
        }

        if (hitBoundary || hitObstacle) {
          game.gameOver = true;
          setCrashed(true);
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Dot-grid background for portfolio-style ambience.
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.06;
      for (let y = 9; y < height; y += GAME_CONFIG.backgroundDotGap) {
        for (let x = 9; x < width; x += GAME_CONFIG.backgroundDotGap) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.globalAlpha = 1;

      // Obstacles.
      for (const obstacle of game.obstacles) {
        const gapTop = obstacle.gapY - obstacle.gapHeight / 2;
        const gapBottom = obstacle.gapY + obstacle.gapHeight / 2;

        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.fillRect(obstacle.x, 0, obstacle.width, gapTop);
        ctx.fillRect(obstacle.x, gapBottom, obstacle.width, height - gapBottom);

        ctx.strokeStyle = "rgba(255,255,255,0.65)";
        ctx.lineWidth = 1;
        ctx.strokeRect(obstacle.x + 0.5, 0.5, obstacle.width - 1, gapTop - 1);
        ctx.strokeRect(obstacle.x + 0.5, gapBottom + 0.5, obstacle.width - 1, height - gapBottom - 1);
      }

      // Trail.
      if (game.trail.length > 1) {
        ctx.beginPath();
        game.trail.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(255,255,255,0.45)";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Ship (triangle).
      const shipY = game.shipY;
      ctx.beginPath();
      ctx.moveTo(shipX + GAME_CONFIG.shipSize, shipY);
      ctx.lineTo(shipX - GAME_CONFIG.shipSize * 0.8, shipY - GAME_CONFIG.shipSize * 0.7);
      ctx.lineTo(shipX - GAME_CONFIG.shipSize * 0.8, shipY + GAME_CONFIG.shipSize * 0.7);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255,255,255,0.7)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePressStart = () => {
    if (gameRef.current.gameOver) {
      resetGame();
    }
    pointerDownRef.current = true;
  };

  const handlePressEnd = () => {
    pointerDownRef.current = false;
  };

  return (
    <div className="w-full max-w-[560px]">
      <div className="mb-2 flex items-center justify-between text-xs text-white/70">
        <span>Score: {score}</span>
        <span>High: {highScore}</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-[220px] w-full overflow-hidden rounded-xl border border-white/15 bg-black/70 shadow-[0_0_22px_rgba(255,255,255,0.08)] sm:h-[240px]"
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full touch-none"
          onPointerDown={handlePressStart}
          onPointerUp={handlePressEnd}
          onPointerLeave={handlePressEnd}
          onPointerCancel={handlePressEnd}
        />

        {crashed && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45">
            <p className="text-sm font-medium tracking-wide text-white/90">Tap to restart</p>
          </div>
        )}
      </div>
    </div>
  );
}
