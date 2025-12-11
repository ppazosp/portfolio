import { useRef, useEffect, useState, useCallback } from 'react';
import * as m from '../../paraglide/messages';

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

type GameState = 'ready' | 'playing' | 'paused' | 'gameover' | 'won';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 5;
const BRICK_OFFSET_TOP = 60;
const BRICK_OFFSET_LEFT = 35;

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<GameState>('ready');

  const gameLoopRef = useRef<number>();

  // Game state
  const gameRef = useRef({
    paddle: { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 40, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, speed: 8 },
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 60, dx: 4, dy: -4, radius: BALL_RADIUS, speed: 4 },
    bricks: [] as Brick[],
    keys: { left: false, right: false },
    touchX: null as number | null
  });

  // Load high score on mount
  useEffect(() => {
    setMounted(true);
    const savedHighScore = localStorage.getItem('breakout-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Initialize bricks
  const createBricks = () => {
    const bricks: Brick[] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          visible: true
        });
      }
    }
    return bricks;
  };

  // Initialize game
  const initGame = useCallback(() => {
    gameRef.current.paddle = {
      x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: 8
    };
    gameRef.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 60,
      dx: 4,
      dy: -4,
      radius: BALL_RADIUS,
      speed: 4
    };
    gameRef.current.bricks = createBricks();
    setScore(0);
    setLives(3);
  }, []);

  // Update game state
  const updateGame = () => {
    const { paddle, ball, bricks, keys, touchX } = gameRef.current;

    // Move paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keys.right && paddle.x < CANVAS_WIDTH - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Touch control
    if (touchX !== null) {
      paddle.x = Math.max(0, Math.min(touchX - paddle.width / 2, CANVAS_WIDTH - paddle.width));
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (left and right)
    if (ball.x + ball.radius > CANVAS_WIDTH || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }

    // Top wall collision
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }

    // Paddle collision
    if (
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      // Calculate bounce angle based on where ball hits paddle
      const hitPos = (ball.x - paddle.x) / paddle.width;
      const angle = (hitPos - 0.5) * Math.PI * 0.6; // -54° to +54°

      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = speed * Math.sin(angle);
      ball.dy = -Math.abs(speed * Math.cos(angle)); // Always bounce up
    }

    // Bottom collision (lose life)
    if (ball.y + ball.radius > CANVAS_HEIGHT) {
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setGameState('gameover');
        return;
      }

      // Reset ball and paddle
      ball.x = CANVAS_WIDTH / 2;
      ball.y = CANVAS_HEIGHT - 60;
      ball.dx = 4;
      ball.dy = -4;
      paddle.x = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
      setGameState('ready');
      return;
    }

    // Brick collision
    for (const brick of bricks) {
      if (!brick.visible) continue;

      if (
        ball.x + ball.radius > brick.x &&
        ball.x - ball.radius < brick.x + brick.width &&
        ball.y + ball.radius > brick.y &&
        ball.y - ball.radius < brick.y + brick.height
      ) {
        ball.dy = -ball.dy;
        brick.visible = false;

        const newScore = score + 10;
        setScore(newScore);

        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('breakout-highscore', newScore.toString());
        }

        break;
      }
    }

    // Check win condition
    if (bricks.every(brick => !brick.visible)) {
      setGameState('won');
    }
  };

  // Draw game
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Get CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--color-background').trim();
    const fgColor = computedStyle.getPropertyValue('--color-foreground').trim();
    const borderColor = computedStyle.getPropertyValue('--color-border').trim();

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = fgColor;
    ctx.fillRect(
      gameRef.current.paddle.x,
      gameRef.current.paddle.y,
      gameRef.current.paddle.width,
      gameRef.current.paddle.height
    );

    // Draw ball
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    ctx.arc(
      gameRef.current.ball.x,
      gameRef.current.ball.y,
      gameRef.current.ball.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw bricks
    ctx.fillStyle = fgColor;
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 2;
    gameRef.current.bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    updateGame();
    draw();

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, draw, score, lives, highScore]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover' || gameState === 'won') {
          initGame();
          setGameState('playing');
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (gameState === 'playing') {
          setGameState('paused');
        } else if (gameState === 'paused') {
          setGameState('playing');
        }
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, initGame]);

  // Touch/mouse controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        const x = ((touch.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        gameRef.current.touchX = x;
      }
    };

    const handleTouchEnd = () => {
      gameRef.current.touchX = null;
    };

    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Start/stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Initialize on mount
  useEffect(() => {
    if (mounted) {
      initGame();
      draw();
    }
  }, [mounted, initGame, draw]);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    const observer = new MutationObserver(() => {
      draw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [mounted, draw]);

  const startGame = () => {
    if (gameState === 'ready' || gameState === 'gameover' || gameState === 'won') {
      initGame();
      setGameState('playing');
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="max-w-full"
          style={{ imageRendering: 'pixelated' }}
          aria-label="Breakout game canvas"
        />

        {/* Score display - inside canvas at top */}
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4 text-xs font-mono pointer-events-none">
          <div className="flex gap-4 bg-background/80 px-1 py-3">
            <span className="text-foreground">{m.arcade_score()}: {score}</span>
            <span className="text-foreground">{m.arcade_lives()}: {lives}</span>
          </div>
          <span className="text-muted bg-background/80 px-1 py-3">{m.arcade_highscore()}: {highScore}</span>
        </div>

        {/* Overlay messages */}
        {(gameState === 'ready' || gameState === 'gameover' || gameState === 'paused' || gameState === 'won') && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              {gameState === 'gameover' && (
                <p className="text-foreground text-2xl font-mono mb-4">{m.arcade_gameover()}</p>
              )}
              {gameState === 'won' && (
                <p className="text-foreground text-2xl font-mono mb-4">YOU WON!</p>
              )}
              {gameState === 'paused' && (
                <p className="text-foreground text-2xl font-mono mb-4">PAUSED</p>
              )}
              <button
                onClick={startGame}
                className="text-muted text-sm font-mono hover:text-foreground transition-colors border border-border px-4 py-2"
              >
                {m.arcade_presskey()}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile instructions */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-xs text-muted font-mono">Drag on canvas to move paddle</p>
        <button
          onClick={startGame}
          className="mt-2 px-6 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          START
        </button>
      </div>
    </div>
  );
}
