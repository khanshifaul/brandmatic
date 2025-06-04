import { useTheme } from '@/hooks/useTheme';
import { Button } from './button';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ThemePicker() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      variant='ghost'
      title='Toggle theme'
      className='relative h-8 w-8 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
      onClick={toggleMode}
    >
      {mode === 'dark' ? (
        <FiSun className='h-5 w-5' />
      ) : (
        <FiMoon className='h-5 w-5' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
} 