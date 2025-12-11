import { useRef, useEffect, useState, useCallback } from 'react';
import * as m from '../../paraglide/messages';

interface Position {
  x: number;
  y: number;
}

type Direction = { dx: number; dy: number };
type GameState = 'ready' | 'playing' | 'paused' | 'gameover';

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_WIDTH = GRID_SIZE * CELL_SIZE; // 500
const GRID_HEIGHT = GRID_SIZE * CELL_SIZE; // 500
const GRID_OFFSET_X = 0;
const GRID_OFFSET_Y = 0 ; // Space for score display at top
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');

  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const speedRef = useRef<number>(INITIAL_SPEED);

  // Game state (using useRef for mutable values)
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }] as Position[],
    food: { x: 15, y: 15 } as Position,
    direction: { dx: 1, dy: 0 } as Direction,
    nextDirection: { dx: 1, dy: 0 } as Direction,
    touchControls: { left: false, right: false, up: false, down: false }
  });

  // Load high score on mount
  useEffect(() => {
    setMounted(true);
    const savedHighScore = localStorage.getItem('snake-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    gameRef.current.snake = [{ x: 10, y: 10 }];
    gameRef.current.direction = { dx: 1, dy: 0 };
    gameRef.current.nextDirection = { dx: 1, dy: 0 };
    spawnFood();
    setScore(0);
    speedRef.current = INITIAL_SPEED;
    lastUpdateRef.current = 0;
  }, []);

  // Spawn food at random position
  const spawnFood = () => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (gameRef.current.snake.some(segment =>
      segment.x === newFood.x && segment.y === newFood.y
    ));
    gameRef.current.food = newFood;
  };

  // Update game state
  const updateGame = () => {
    const { snake, food, nextDirection } = gameRef.current;

    // Update direction
    gameRef.current.direction = nextDirection;
    const { dx, dy } = gameRef.current.direction;

    // Calculate new head position
    const head = snake[0];
    const newHead = {
      x: head.x + dx,
      y: head.y + dy
    };

    // Check wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE) {
      setGameState('gameover');
      return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameState('gameover');
      return;
    }

    // Add new head
    snake.unshift(newHead);

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      const newScore = score + 10;
      setScore(newScore);

      // Update high score
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('snake-highscore', newScore.toString());
      }

      // Increase speed
      speedRef.current = Math.max(50, INITIAL_SPEED - snake.length * 5);

      spawnFood();
    } else {
      // Remove tail if no food eaten
      snake.pop();
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
    const mutedColor = computedStyle.getPropertyValue('--color-muted').trim();

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(GRID_OFFSET_X + i * CELL_SIZE, GRID_OFFSET_Y);
      ctx.lineTo(GRID_OFFSET_X + i * CELL_SIZE, GRID_OFFSET_Y + GRID_HEIGHT);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(GRID_OFFSET_X, GRID_OFFSET_Y + i * CELL_SIZE);
      ctx.lineTo(GRID_OFFSET_X + GRID_WIDTH, GRID_OFFSET_Y + i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    ctx.fillStyle = fgColor;
    gameRef.current.snake.forEach(segment => {
      ctx.fillRect(
        GRID_OFFSET_X + segment.x * CELL_SIZE + 1,
        GRID_OFFSET_Y + segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    ctx.arc(
      GRID_OFFSET_X + gameRef.current.food.x * CELL_SIZE + CELL_SIZE / 2,
      GRID_OFFSET_Y + gameRef.current.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, []);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (!lastUpdateRef.current) {
      lastUpdateRef.current = timestamp;
    }

    const deltaTime = timestamp - lastUpdateRef.current;

    if (deltaTime >= speedRef.current) {
      updateGame();
      draw();
      lastUpdateRef.current = timestamp;
    } else {
      draw();
    }

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, draw, score, highScore]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { direction } = gameRef.current;

      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover') {
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

      // Prevent changing direction to opposite
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' && direction.dx === 0) {
        gameRef.current.nextDirection = { dx: -1, dy: 0 };
      }
      if (e.key === 'ArrowRight' && direction.dx === 0) {
        gameRef.current.nextDirection = { dx: 1, dy: 0 };
      }
      if (e.key === 'ArrowUp' && direction.dy === 0) {
        gameRef.current.nextDirection = { dx: 0, dy: -1 };
      }
      if (e.key === 'ArrowDown' && direction.dy === 0) {
        gameRef.current.nextDirection = { dx: 0, dy: 1 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, initGame]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      lastUpdateRef.current = 0;
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

  // Touch controls
  const handleTouchControl = (direction: 'left' | 'right' | 'up' | 'down') => {
    const { direction: currentDir } = gameRef.current;

    if (direction === 'left' && currentDir.dx === 0) {
      gameRef.current.nextDirection = { dx: -1, dy: 0 };
    }
    if (direction === 'right' && currentDir.dx === 0) {
      gameRef.current.nextDirection = { dx: 1, dy: 0 };
    }
    if (direction === 'up' && currentDir.dy === 0) {
      gameRef.current.nextDirection = { dx: 0, dy: -1 };
    }
    if (direction === 'down' && currentDir.dy === 0) {
      gameRef.current.nextDirection = { dx: 0, dy: 1 };
    }
  };

  const startGame = () => {
    if (gameState === 'ready' || gameState === 'gameover') {
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
          aria-label="Snake game canvas"
        />

        {/* Score display - inside canvas at top */}
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4 text-xs font-mono pointer-events-none">
          <span className="text-foreground bg-background/80 px-1 py-3">{m.arcade_score()}: {score}</span>
          <span className="text-muted bg-background/80 px-1 py-3">{m.arcade_highscore()}: {highScore}</span>
        </div>

        {/* Overlay messages */}
        {(gameState === 'ready' || gameState === 'gameover' || gameState === 'paused') && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              {gameState === 'gameover' && (
                <p className="text-foreground text-2xl font-mono mb-4">{m.arcade_gameover()}</p>
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

      {/* Mobile touch controls */}
      <div className="md:hidden mt-4 grid grid-cols-3 gap-2 w-full max-w-xs">
        <div></div>
        <button
          onTouchStart={() => handleTouchControl('up')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          ↑
        </button>
        <div></div>
        <button
          onTouchStart={() => handleTouchControl('left')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          ←
        </button>
        <button
          onClick={startGame}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          START
        </button>
        <button
          onTouchStart={() => handleTouchControl('right')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          →
        </button>
        <div></div>
        <button
          onTouchStart={() => handleTouchControl('down')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          ↓
        </button>
        <div></div>
      </div>
    </div>
  );
}
