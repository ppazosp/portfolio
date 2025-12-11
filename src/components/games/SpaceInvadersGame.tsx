import { useRef, useEffect, useState, useCallback } from 'react';
import * as m from '../../paraglide/messages';

interface Position {
  x: number;
  y: number;
}

interface Invader extends Position {
  alive: boolean;
  width: number;
  height: number;
}

interface Bullet extends Position {
  fromPlayer: boolean;
  speed: number;
}

type GameState = 'ready' | 'playing' | 'paused' | 'gameover' | 'won';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const INVADER_WIDTH = 30;
const INVADER_HEIGHT = 20;
const INVADER_ROWS = 5;
const INVADER_COLS = 11;
const INVADER_PADDING = 10;

export default function SpaceInvadersGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');

  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const invaderMoveIntervalRef = useRef<number>(0);
  const shootIntervalRef = useRef<number>(0);

  // Game state
  const gameRef = useRef({
    player: { x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 60, width: PLAYER_WIDTH, height: PLAYER_HEIGHT, speed: 6 },
    invaders: [] as Invader[],
    bullets: [] as Bullet[],
    invaderDirection: 1 as 1 | -1,
    invaderSpeed: 1,
    invaderDropDistance: 20,
    keys: { left: false, right: false, space: false },
    canShoot: true,
    touchControls: { left: false, right: false, shoot: false }
  });

  // Load high score on mount
  useEffect(() => {
    setMounted(true);
    const savedHighScore = localStorage.getItem('spaceinvaders-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Create invaders
  const createInvaders = () => {
    const invaders: Invader[] = [];
    const startX = 100;
    const startY = 80;

    for (let row = 0; row < INVADER_ROWS; row++) {
      for (let col = 0; col < INVADER_COLS; col++) {
        invaders.push({
          x: startX + col * (INVADER_WIDTH + INVADER_PADDING),
          y: startY + row * (INVADER_HEIGHT + INVADER_PADDING),
          width: INVADER_WIDTH,
          height: INVADER_HEIGHT,
          alive: true
        });
      }
    }

    return invaders;
  };

  // Initialize game
  const initGame = useCallback(() => {
    gameRef.current.player = {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 60,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      speed: 6
    };
    gameRef.current.invaders = createInvaders();
    gameRef.current.bullets = [];
    gameRef.current.invaderDirection = 1;
    gameRef.current.invaderSpeed = 1;
    gameRef.current.canShoot = true;
    setScore(0);
    invaderMoveIntervalRef.current = 0;
    shootIntervalRef.current = 0;
  }, []);

  // Player shoot
  const playerShoot = () => {
    if (!gameRef.current.canShoot) return;

    const { player } = gameRef.current;
    gameRef.current.bullets.push({
      x: player.x + player.width / 2,
      y: player.y,
      fromPlayer: true,
      speed: 7
    });
    gameRef.current.canShoot = false;

    setTimeout(() => {
      gameRef.current.canShoot = true;
    }, 500);
  };

  // Invader shoot
  const invaderShoot = () => {
    const aliveInvaders = gameRef.current.invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) return;

    // Random invader shoots
    const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
    gameRef.current.bullets.push({
      x: shooter.x + shooter.width / 2,
      y: shooter.y + shooter.height,
      fromPlayer: false,
      speed: 4
    });
  };

  // Update game state
  const updateGame = (timestamp: number) => {
    const { player, invaders, bullets, keys, touchControls } = gameRef.current;

    // Move player
    if ((keys.left || touchControls.left) && player.x > 0) {
      player.x -= player.speed;
    }
    if ((keys.right || touchControls.right) && player.x < CANVAS_WIDTH - player.width) {
      player.x += player.speed;
    }

    // Shoot
    if ((keys.space || touchControls.shoot) && gameRef.current.canShoot) {
      playerShoot();
      touchControls.shoot = false; // Reset touch shoot
    }

    // Move invaders
    if (timestamp - invaderMoveIntervalRef.current > 500 / gameRef.current.invaderSpeed) {
      let shouldDrop = false;
      const aliveInvaders = invaders.filter(inv => inv.alive);

      // Check if invaders hit edge
      for (const invader of aliveInvaders) {
        if (
          (gameRef.current.invaderDirection === 1 && invader.x + invader.width >= CANVAS_WIDTH - 10) ||
          (gameRef.current.invaderDirection === -1 && invader.x <= 10)
        ) {
          shouldDrop = true;
          break;
        }
      }

      if (shouldDrop) {
        // Drop and change direction
        invaders.forEach(invader => {
          if (invader.alive) {
            invader.y += gameRef.current.invaderDropDistance;
          }
        });
        gameRef.current.invaderDirection *= -1;

        // Check if invaders reached bottom
        if (aliveInvaders.some(inv => inv.y + inv.height >= player.y)) {
          setGameState('gameover');
          return;
        }
      } else {
        // Move horizontally
        invaders.forEach(invader => {
          if (invader.alive) {
            invader.x += gameRef.current.invaderDirection * 10;
          }
        });
      }

      invaderMoveIntervalRef.current = timestamp;
    }

    // Invaders shoot randomly
    if (timestamp - shootIntervalRef.current > 1000) {
      invaderShoot();
      shootIntervalRef.current = timestamp;
    }

    // Move bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];

      if (bullet.fromPlayer) {
        bullet.y -= bullet.speed;
      } else {
        bullet.y += bullet.speed;
      }

      // Remove off-screen bullets
      if (bullet.y < 0 || bullet.y > CANVAS_HEIGHT) {
        bullets.splice(i, 1);
        continue;
      }

      // Check bullet-invader collision (player bullets only)
      if (bullet.fromPlayer) {
        for (const invader of invaders) {
          if (!invader.alive) continue;

          if (
            bullet.x >= invader.x &&
            bullet.x <= invader.x + invader.width &&
            bullet.y >= invader.y &&
            bullet.y <= invader.y + invader.height
          ) {
            invader.alive = false;
            bullets.splice(i, 1);

            const newScore = score + 10;
            setScore(newScore);

            // Update high score
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('spaceinvaders-highscore', newScore.toString());
            }

            // Increase speed
            const aliveCount = invaders.filter(inv => inv.alive).length;
            gameRef.current.invaderSpeed = 1 + (INVADER_ROWS * INVADER_COLS - aliveCount) / 10;

            break;
          }
        }
      }

      // Check bullet-player collision (invader bullets only)
      if (!bullet.fromPlayer) {
        if (
          bullet.x >= player.x &&
          bullet.x <= player.x + player.width &&
          bullet.y >= player.y &&
          bullet.y <= player.y + player.height
        ) {
          setGameState('gameover');
          return;
        }
      }
    }

    // Check win condition
    if (invaders.every(inv => !inv.alive)) {
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

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = fgColor;
    ctx.fillRect(
      gameRef.current.player.x,
      gameRef.current.player.y,
      gameRef.current.player.width,
      gameRef.current.player.height
    );

    // Draw player cannon
    ctx.fillRect(
      gameRef.current.player.x + gameRef.current.player.width / 2 - 3,
      gameRef.current.player.y - 10,
      6,
      10
    );

    // Draw invaders (retro alien shape)
    ctx.fillStyle = fgColor;
    gameRef.current.invaders.forEach(invader => {
      if (!invader.alive) return;

      // Simple alien shape using rects
      const x = invader.x;
      const y = invader.y;
      const w = invader.width;
      const h = invader.height;

      // Body
      ctx.fillRect(x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.5);

      // Arms
      ctx.fillRect(x, y + h * 0.4, w * 0.2, h * 0.2);
      ctx.fillRect(x + w * 0.8, y + h * 0.4, w * 0.2, h * 0.2);

      // Eyes
      ctx.fillRect(x + w * 0.3, y + h * 0.4, w * 0.1, h * 0.2);
      ctx.fillRect(x + w * 0.6, y + h * 0.4, w * 0.1, h * 0.2);

      // Legs
      ctx.fillRect(x + w * 0.2, y + h * 0.8, w * 0.2, h * 0.2);
      ctx.fillRect(x + w * 0.6, y + h * 0.8, w * 0.2, h * 0.2);
    });

    // Draw bullets
    ctx.fillStyle = fgColor;
    gameRef.current.bullets.forEach(bullet => {
      ctx.fillRect(bullet.x - 2, bullet.y - 5, 4, 10);
    });
  }, []);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (!lastUpdateRef.current) {
      lastUpdateRef.current = timestamp;
    }

    updateGame(timestamp);
    draw();

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, draw, score, highScore]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover' || gameState === 'won') {
          initGame();
          setGameState('playing');
        } else {
          gameRef.current.keys.space = true;
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

      if (e.key === 'ArrowLeft') {
        gameRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight') {
        gameRef.current.keys.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft') {
        gameRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight') {
        gameRef.current.keys.right = false;
      }
      if (e.key === ' ') {
        gameRef.current.keys.space = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
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
  const handleTouchControl = (action: 'left' | 'right' | 'shoot') => {
    if (action === 'left') {
      gameRef.current.touchControls.left = true;
      setTimeout(() => {
        gameRef.current.touchControls.left = false;
      }, 100);
    }
    if (action === 'right') {
      gameRef.current.touchControls.right = true;
      setTimeout(() => {
        gameRef.current.touchControls.right = false;
      }, 100);
    }
    if (action === 'shoot') {
      gameRef.current.touchControls.shoot = true;
    }
  };

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
          aria-label="Space Invaders game canvas"
        />

        {/* Score display - inside canvas at top */}
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4 text-xs font-mono pointer-events-none">
          <span className="text-foreground bg-background/80 px-1 py-3">{m.arcade_score()}: {score}</span>
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
                <p className="text-foreground text-2xl font-mono mb-4">VICTORY!</p>
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
        <button
          onTouchStart={() => handleTouchControl('left')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          ←
        </button>
        <button
          onTouchStart={() => handleTouchControl('shoot')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          FIRE
        </button>
        <button
          onTouchStart={() => handleTouchControl('right')}
          className="px-4 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          →
        </button>
      </div>

      {/* Mobile start button */}
      <div className="md:hidden mt-2 w-full max-w-xs">
        <button
          onClick={startGame}
          className="w-full px-6 py-3 border border-foreground text-foreground font-mono active:bg-foreground active:text-background"
        >
          START
        </button>
      </div>
    </div>
  );
}
