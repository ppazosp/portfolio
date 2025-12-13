import { useRef, useEffect, useState, useCallback } from 'react';
import * as m from '../../paraglide/messages';
import { Gamepad2, Target, Heart, Crown } from 'lucide-react';

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

type GameState = 'ready' | 'playing' | 'paused' | 'gameover' | 'won';

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 5;
const BRICK_OFFSET_TOP = 80; // Increased to avoid score display overlap

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic canvas dimensions based on viewport
  // Mobile: 9:16 portrait (540x960), Desktop: 16:9 widescreen (1280x720)
  const CANVAS_WIDTH = isMobile ? 540 : 1280;
  const CANVAS_HEIGHT = isMobile ? 960 : 720;
  const BRICK_COLS = isMobile ? 6 : 12; // Fewer columns on mobile
  const BRICK_ROWS = isMobile ? 6 : 6; // Same rows for both mobile and desktop
  // Scale speed for mobile - 1.5x faster to account for taller canvas
  const SPEED_SCALE = isMobile ? 1.5 : 1;
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('ready');

  const gameLoopRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);

  // Game state
  const gameRef = useRef({
    paddle: { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 40, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, speed: 8 },
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 60, dx: 4, dy: -4, radius: BALL_RADIUS, speed: 4 },
    bricks: [] as Brick[],
    keys: { left: false, right: false },
    touchX: null as number | null
  });

  // Detect mobile and load high score on mount
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const savedHighScore = localStorage.getItem('breakout-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize bricks based on level
  const createBricks = (currentLevel: number) => {
    const bricks: Brick[] = [];
    const rows = Math.min(BRICK_ROWS + currentLevel - 1, BRICK_ROWS + 3); // Increase rows each level
    const cols = BRICK_COLS;

    // Calculate left offset to center bricks horizontally
    const totalBricksWidth = cols * BRICK_WIDTH + (cols - 1) * BRICK_PADDING;
    const brickOffsetLeft = (CANVAS_WIDTH - totalBricksWidth) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Level-specific patterns - skip some bricks for variety
        if (currentLevel === 2 && row === 2 && col % 2 === 0) continue;
        if (currentLevel === 3 && (row + col) % 3 === 0) continue;
        if (currentLevel === 4 && row === 3 && col >= 3 && col <= 6) continue;
        if (currentLevel === 5 && ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1))) continue;

        bricks.push({
          x: col * (BRICK_WIDTH + BRICK_PADDING) + brickOffsetLeft,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          visible: true
        });
      }
    }
    return bricks;
  };

  // Initialize level
  const initLevel = useCallback((currentLevel: number) => {
    const baseBallSpeed = 4 + (currentLevel - 1) * 0.5; // Increase speed each level
    const ballSpeed = baseBallSpeed * SPEED_SCALE; // Scale for mobile
    const paddleSpeed = 8 * SPEED_SCALE; // Scale paddle speed too

    gameRef.current.paddle = {
      x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: paddleSpeed
    };
    gameRef.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 60,
      dx: ballSpeed,
      dy: -ballSpeed,
      radius: BALL_RADIUS,
      speed: ballSpeed
    };
    gameRef.current.bricks = createBricks(currentLevel);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, SPEED_SCALE]);

  // Initialize game (start from level 1)
  const initGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setLives(3);
    initLevel(1);
  }, [initLevel]);

  // Update game state
  const updateGame = (deltaTime: number) => {
    const { paddle, ball, bricks, keys, touchX } = gameRef.current;

    // Delta time in seconds (capped to prevent huge jumps)
    const dt = Math.min(deltaTime / 1000, 0.1);

    // Move paddle
    if (keys.left && paddle.x > 0) {
      paddle.x -= paddle.speed * dt * 60; // Multiply by 60 to maintain same feel as 60 FPS
    }
    if (keys.right && paddle.x < CANVAS_WIDTH - paddle.width) {
      paddle.x += paddle.speed * dt * 60;
    }

    // Touch control (instant positioning, no deltaTime needed)
    if (touchX !== null) {
      paddle.x = Math.max(0, Math.min(touchX - paddle.width / 2, CANVAS_WIDTH - paddle.width));
    }

    // Move ball
    ball.x += ball.dx * dt * 60; // Multiply by 60 for 60 FPS baseline
    ball.y += ball.dy * dt * 60;

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

      // Reset ball and paddle with current level's speed
      const baseBallSpeed = 4 + (level - 1) * 0.5;
      const ballSpeed = baseBallSpeed * SPEED_SCALE;
      ball.x = CANVAS_WIDTH / 2;
      ball.y = CANVAS_HEIGHT - 60;
      ball.dx = ballSpeed;
      ball.dy = -ballSpeed;
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

    // Check level complete condition
    if (bricks.every(brick => !brick.visible)) {
      if (level < 5) {
        // Advance to next level
        const nextLevel = level + 1;
        setLevel(nextLevel);
        initLevel(nextLevel);
        setGameState('ready');
      } else {
        // Won the game (completed all 5 levels)
        setGameState('won');
      }
    }
  };

  // Draw game
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Get CSS variables with fallbacks for mobile
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--color-background').trim() || '#000000';
    const fgColor = computedStyle.getPropertyValue('--color-foreground').trim() || '#ffffff';

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
  const gameLoop = useCallback((timestamp: number) => {
    // Calculate delta time
    if (lastFrameTimeRef.current === 0) {
      lastFrameTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastFrameTimeRef.current;
    lastFrameTimeRef.current = timestamp;

    updateGame(deltaTime);
    draw();

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, draw, score, lives, highScore, level]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'gameover' || gameState === 'won') {
          initGame();
          setGameState('playing');
        } else if (gameState === 'ready') {
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
    if (!canvas || !mounted) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        const x = ((touch.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        gameRef.current.touchX = x;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        const x = ((touch.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        gameRef.current.touchX = x;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      gameRef.current.touchX = null;
    };

    // Also handle mouse for desktop
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
      gameRef.current.touchX = x;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) { // Left mouse button is pressed
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        gameRef.current.touchX = x;
      }
    };

    const handleMouseUp = () => {
      gameRef.current.touchX = null;
    };

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [mounted]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      lastFrameTimeRef.current = 0; // Reset frame time when starting
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
      // Use requestAnimationFrame to ensure canvas is ready
      requestAnimationFrame(() => {
        draw();
      });
    }
  }, [mounted, initGame, draw]);

  // Reinitialize game when viewport changes
  useEffect(() => {
    if (mounted) {
      initGame();
      requestAnimationFrame(() => {
        draw();
      });
    }
  }, [isMobile, mounted, initGame, draw]);

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
    if (gameState === 'gameover' || gameState === 'won') {
      // Start a new game from scratch
      // Explicitly reset all state to ensure clean start
      setLevel(1);
      setScore(0);
      setLives(3);
      initLevel(1);
      setGameState('playing');
    } else if (gameState === 'ready') {
      // Continue playing (after losing a life or starting a new level)
      setGameState('playing');
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-full max-h-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block w-full h-full"
          style={{
            imageRendering: 'pixelated',
            objectFit: 'contain',
            touchAction: 'none',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          aria-label="Breakout game canvas"
        />

        {/* Score display - inside canvas at top */}
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4 text-xs font-mono pointer-events-none">
          <div className="flex gap-4 bg-background/80 px-2 py-1">
            <span className="text-foreground flex items-center gap-1">
              <Gamepad2 size={14} /> {level}/5
            </span>
            <span className="text-foreground flex items-center gap-1">
              <Target size={14} /> {score}
            </span>
            <span className="text-foreground flex items-center gap-1">
              <Heart size={14} /> {lives}
            </span>
          </div>
          <span className="text-muted bg-background/80 px-2 py-1 flex items-center gap-1">
            <Crown size={14} /> {highScore}
          </span>
        </div>

        {/* Overlay messages */}
        {(gameState === 'ready' || gameState === 'gameover' || gameState === 'paused' || gameState === 'won') && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              {gameState === 'ready' && (
                <p className="text-foreground text-2xl font-mono mb-4">LEVEL {level}</p>
              )}
              {gameState === 'gameover' && (
                <p className="text-foreground text-2xl font-mono mb-4">{m.arcade_gameover()}</p>
              )}
              {gameState === 'won' && (
                <p className="text-foreground text-2xl font-mono mb-4">YOU WON ALL 5 LEVELS!</p>
              )}
              {gameState === 'paused' && (
                <p className="text-foreground text-2xl font-mono mb-4">PAUSED</p>
              )}
              <button
                onClick={startGame}
                className="text-muted text-sm font-mono hover:text-foreground transition-colors border border-border px-4 py-2"
              >
                {gameState === 'ready'
                  ? (isMobile ? 'Tap to continue' : 'Press SPACE to continue')
                  : (isMobile ? 'Tap to start' : m.arcade_presskey())
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
