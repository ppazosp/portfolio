import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import type { Locale } from '../lib/i18n';

interface Props {
  currentLocale: Locale;
  currentPath: string;
}

export default function LanguageSwitcher({ currentLocale, currentPath }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAlternateUrl = () => {
    if (currentLocale === 'en') {
      // Switch to Spanish: add /es prefix
      return `/es${currentPath === '/' ? '' : currentPath}`;
    } else {
      // Switch to English: remove /es prefix
      return currentPath.replace(/^\/es/, '') || '/';
    }
  };

  const targetLocale = currentLocale === 'en' ? 'es' : 'en';
  const targetLabel = currentLocale === 'en' ? 'Español' : 'English';

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-8 h-8 text-muted transition-colors"
        aria-label="Language switcher"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const handleLanguageSwitch = () => {
    localStorage.setItem('manual-locale-selection', 'true');
  };

  return (
    <a
      href={getAlternateUrl()}
      onClick={handleLanguageSwitch}
      className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors"
      aria-label={`Switch to ${targetLabel}`}
      title={`Switch to ${targetLabel}`}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline uppercase">{targetLocale}</span>
    </a>
  );
}
