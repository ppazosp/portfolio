import { useState, useEffect } from 'react';
import { type Locale } from '../lib/i18n';
import * as m from '../paraglide/messages';
import SnakeGame from './games/SnakeGame';
import BreakoutGame from './games/BreakoutGame';
import SpaceInvadersGame from './games/SpaceInvadersGame';

interface Props {
  locale: Locale;
}

type GameId = 'snake' | 'breakout' | 'spaceinvaders';

export default function RetroArcade({ locale }: Props) {
  const [mounted, setMounted] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameId>('snake');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex gap-8">
        <div className="w-64 border border-border" style={{ height: '600px' }} />
        <div className="flex-1 border border-border" style={{ height: '600px' }} />
      </div>
    );
  }

  const games = [
    {
      id: 'snake' as GameId,
      name: m.arcade_game_snake(),
      desc: m.arcade_game_snake_desc()
    },
    {
      id: 'breakout' as GameId,
      name: m.arcade_game_breakout(),
      desc: m.arcade_game_breakout_desc()
    },
    {
      id: 'spaceinvaders' as GameId,
      name: m.arcade_game_spaceinvaders(),
      desc: m.arcade_game_spaceinvaders_desc()
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Game selector - Left column */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex flex-col border-r border-t border-b border-border" style={{ height: '600px' }}>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`flex-1 p-4 text-left transition-all bg-background text-foreground border-b border-border last:border-b-0 ${
                selectedGame === game.id
                  ? 'border-l-2 border-l-foreground'
                  : 'border-l-2 border-l-border hover:border-l-foreground'
              }`}
            >
              <div className="font-mono text-sm mb-2">{game.name}</div>
              <div className="text-xs leading-relaxed text-muted">
                {game.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Game canvas - Right column */}
      <div className="flex-1">
        <div className="relative border border-border bg-background overflow-hidden" style={{ height: '600px' }}>
          {/* Game renders here */}
          {selectedGame === 'snake' && <SnakeGame />}
          {selectedGame === 'breakout' && <BreakoutGame />}
          {selectedGame === 'spaceinvaders' && <SpaceInvadersGame />}

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay" />
        </div>
      </div>
    </div>
  );
}
