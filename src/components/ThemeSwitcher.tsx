import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { onEnterOrSpaceKeyDown } from '@/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">
        {theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System mode'}
      </span>
      <Button
        variant="outline"
        onClick={() => {
          if (theme === 'light') setTheme('dark');
          else if (theme === 'dark') setTheme('system');
          else setTheme('light');
        }}
        tabIndex={0}
        onKeyDown={onEnterOrSpaceKeyDown(() => {
          if (theme === 'light') setTheme('dark');
          else if (theme === 'dark') setTheme('system');
          else setTheme('light');
        })}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
        className="focus-ring"
      >
        {theme === 'light' && <Moon className="h-5 w-5 theme-icon theme-icon-active" />}
        {theme === 'dark' && <Sun className="h-5 w-5 theme-icon theme-icon-active" />}
        {theme === 'system' && <span className="h-5 w-5 theme-icon theme-icon-active">Auto</span>}
      </Button>
    </div>
  );
}
